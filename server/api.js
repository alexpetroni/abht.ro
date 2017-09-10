const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = require('./db')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const mv = require('mv')
// const sharp = require('sharp')
const multer = require('multer')

const json2csv = require('json2csv')

const mime = require('mime')

const async = require('async')

const config = require('./../abht.config.js')

const ys = require('./ys.js')


const ObjectId = mongoose.Types.ObjectId


const uploadDirPath = path.join(__dirname, `./../${config.uploadDir}`)
const tmpUploadPath = uploadDirPath + '/tmp'


// ===================== INSTALL =========================
router.route('/install')

.get((req, res) => {

  const counties = require('./install-files/counties')

  counties.forEach(c =>{
    let county = { slug: c.slug.toLowerCase(), name: c.name, parent: null }
    db.Adminlocation.findOneAndUpdate({ slug: county.slug, parent: null } , county, { upsert:true }, function(err, rec){

    })
  })

  const mainCadastralCodes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV']

  mainCadastralCodes.forEach( (c, index) => {
    let baseCadastral = { slug: c.toLowerCase(), name: c , ancestors: [ ], parent: null, breadcrumb: c, order: index+1 }
    db.Cadastral.findOneAndUpdate({ slug: baseCadastral.slug, parent: null }, baseCadastral, { upsert: true }, function(err, res){

    })
  })

  res.send('gata')

})



// ===================== INITIALIZE =========================
router.route('/app-initialize')
.get((req, res, next) => {

  async.parallel({
    cadastralListLevel_0: function(cb){
      db.Cadastral
      .find({ parent: null })
      .sort({ order: 'asc' })
      .exec( cb )
    },

    countiesList: function(cb){
      db.Adminlocation
      .find({ parent: null })
      .sort({ name: 'asc' })
      .exec( cb )
    }
  },
  function(err, result){
    if(err) return next(err)
    res.send(result)
  })

})



// ===================== CITIES & COUNTIES =========================
// get the cities from a county

router.route('/cities/:countyId')
.get((req, res, next) => {
  let countyId = req.params.countyId

  if(!countyId){
    res.send([])
  }

  db.Adminlocation.find({ parent: ObjectId(countyId)}).sort({name: 1}).exec( function(err, arr){
    if(err) return next(err)
    res.send(arr)
  })
})

router.route('/counties')
.get((req, res, next) => {

  db.Adminlocation
  .find({ parent: null })
  .sort({ name: 'asc' })
  .exec( function(err, counties){
    if(err) return next(err)
    res.send(counties)
  })
})



// ===================== CADASTRALS =========================

router.route('/cadastrals')
.get((req, res, next) => {

  db.Cadastral
  .find({ parent: null })
  .sort({ name: 'asc' })
  .exec( function(err, cad){
    if(err) return next(err)
    res.send(cad)
  })
})

router.route('/cadastrals/:parentId')
.get((req, res, next) => {
  const id = req.params.parentId

  if(!ObjectId.isValid(id)){
    return res.send([])
  }

  db.Cadastral
  .find({ parent: id })
  .sort({ name: 'asc' })
  .exec( function(err, cad){
    if(err) return next(err)
    res.send(cad)
  })
})



// ===================== CONSTRUCTIONS =========================

router.route('/constructions')

.post((req, res, next) => {  // ===================  ADD NEW CONSTRUCTION WITH INVENTORY ===================

  let data = req.body
  data.kind = req.body.type


  let cadastralCodeArr = data.gd._cadastral_code_items_arr
  let adminLocation = data.gd.adminlocation

  delete data['_id']
  delete data['gd']['cadastral_code']
  delete data['gd']['adminlocation']

  let cons = db.Construction.create(data, function (err, c) {
    if (err) return next(err)
    console.log('start calculate ys')
    // saved!
    c.current_inventory.ys = ys.calculateYs(c, c.current_inventory)

    async.parallel([
      async.reflect(function(callback){
        getAdminlocationId(adminLocation.county_id, adminLocation.city, callback)
      }),

      async.reflect(function(callback){
        getCadastralCodeId(cadastralCodeArr, callback)
      }),
    ],
    function(err, results){
      if(!results[0].error){
        c.gd._adminlocation = ObjectId(results[0].value)
      }

      if(!results[1].error){
        c.gd.cadastral_code = ObjectId(results[1].value)
      }


      c.save(function(err, newConstruction){
        if(err) return next(err)

        res.json(newConstruction)
      })
    })
  })


})

.get((req, res, next) => {  // ===================  GET CONSTRUCTIONS LIST ===================


  let q = req.query

  parseQueryToFilters(q, function(err, filters){
    if(err) return next(err)

    let itemsPerPage = parseInt( q.itemsPerPage ) ? parseInt( q.itemsPerPage ) : 50

    let page = parseInt( q.page ) ? parseInt( q.page ) : 1

    let t3 =present()

    async.parallel(
      [
        async.reflect(function(cb){
          db.Construction.find(filters)
          .select("type  gd.construction_code gd.basin_name gd.cadastral_code current_inventory")
          .populate("gd.cadastral_code")
          .skip( (page-1) * itemsPerPage)
          .limit(itemsPerPage)
          .exec(cb) }),

          async.reflect( function(cb){
            db.Construction.where(filters).count(cb)
          })
        ],
        function(err, results){
          if(err) return next(err)

          let response = { items: [], total: 0, page: page, itemsPerPage: itemsPerPage }

          if(!results[0].error){
            response.items = results[0].value
          }

          if(!results[0].error){
            response.total = results[1].value
          }

          res.send(response)
        })
  })
})



router.route('/constructions/:id')
.get((req, res, next) => {  // ===================  GET CONSTRUCTION ===================
  const id = req.params.id
  if(ObjectId.isValid(id)){
    db.Construction.getFullConstruction(id, function(err, construction){
      res.send(construction)
    })
  }else{
    next(new Error("Invalid construction id"))
  }
})

.delete((req, res, next) => {  // ===================  DELETE CONSTRUCTION ===================
  const id = req.params.id
  if(ObjectId.isValid(id)){
    db.Construction.getFullConstruction(id, function(err, construction){
      let constructionImages = construction.current_inventory.images

      construction.inventories_archive.forEach(inv => {
        constructionImages.push(...inv.images)

        let constructionImagesLean = JSON.parse(JSON.stringify(constructionImages))
        deleteConstructionInventoryImages(constructionImagesLean, function(err, res){
          // don't care, don't wait for it
        })
      })

      construction.remove(function(err, del){
        if(err) return next(err)
        res.send(id)
      })


    })
  }else{
    next(new Error("Invalid construction id"))
  }
})



router.route('/constructions/:id/generaldata')

.put((req, res, next) => {  // ===================  UPDATE CONSTRUCTION GENERAL DATA ===================
  const id = req.params.id
  if(ObjectId.isValid(id)){
    let data = req.body

    db.Construction.findById( id , function(err, construction){
      if(err) return next(err)

      if(!construction){
        return next(new Error("No construction with this id"))
      }

      construction.gd = data

      async.parallel([
        async.reflect(function(callback){
          getAdminlocationId(data.adminlocation.county_id, data.adminlocation.city, callback)
        }),

        async.reflect(function(callback){
          getCadastralCodeId(data._cadastral_code_items_arr, callback)
        }),
      ],
      function(err, results){
        if(!results[0].error){
          construction.gd._adminlocation = ObjectId(results[0].value)
        }

        if(!results[1].error){
          construction.gd.cadastral_code = ObjectId(results[1].value)
        }


        construction.save(function(err, newConstruction){
          if(err) return next(err)

          db.Construction.getFullConstruction(id, function(err, updatedConstr){
            res.send(updatedConstr)
          })

        })
      })
    })
  }else{
    next(new Error("Invalid construction id"))
  }

})

router.route('/constructions/:id/constructiondata')

.put((req, res, next) => {  // ===================  UPDATE CONSTRUCTION DATA ===================
  const id = req.params.id
  if(ObjectId.isValid(id)){
    let data = req.body



    db.Construction.findById( id , function(err, construction){
      if(err) return next(err)

      if(!construction){
        return next(new Error("No construction with this id"))
      }

      if(data.type == 'trans'){
        construction.cd.dam = data.dam
        if(construction.cd.has_final_spur){
          construction.cd.final_spur = data.final_spur
        }
      }else{
        construction.cd.sectors = data.sectors
        construction.cd.total_length = data.total_length
        if(construction.cd.has_final_spur){
          construction.cd.final_spur = data.final_spur
        }
      }



      construction.save(function(err, newConstruction){
        if(err) return next(err)

        db.Construction.getFullConstruction(id, function(err, updatedConstr){
          res.send(updatedConstr)
        })
      })
    })
  }else{
    next(new Error("Invalid construction id"))
  }

})



router.route('/constructions/:id/inventory/:year')

.put((req, res, next) => { // ===================  UPDATE INVENTORY ===================
  const id = req.params.id
  const year = req.params.year

  if(ObjectId.isValid(id)){
    let data = req.body

    db.Construction.findById( id , function(err, construction){
      if(err) return next(err)

      if(!construction){
        return next(new Error("No construction with this id"))
      }

      let invYs = ys.calculateYs(construction, data)
      data.ys = invYs

      if(construction.current_inventory.year == year){
        construction.current_inventory = data
      }else{
        let invIndex = construction.inventories_archive.findIndex(e => { return e.year == year } )

        if(invIndex != -1){
          construction.inventories_archive[invIndex] = data
        }
      }

      construction.save(function(err, newConstruction){
        if(err) return next(err)

        db.Construction.getFullConstruction(id, function(err, updatedConstr){
          res.send(updatedConstr)
        })
      })
    })
  }else{
    next(new Error("Invalid construction id"))
  }

})

.delete( (req, res, next) => {  // ===================  DELETE INVENTORY ===================
  const id = req.params.id
  const year = req.params.year

  getConstructionWithInventory(id, year, function(err, construction){
    if(err) return next(err)

    let inventoryImages = []

    // if it is an archive inventory, delete it
    let invIndex = construction.inventories_archive.findIndex(inv => inv.year == year)
    if(invIndex !== -1){

      inventoryImages = construction.inventories_archive[invIndex].images

      construction.inventories_archive.splice(invIndex, 1)

    }else if(construction.current_inventory.year == year){
      if(construction.inventories_archive.length == 0){
          return next(new Error("O constructie trebuie sa aiba cel putin un inventar."))
      }

      // search for the most recent inventory to replace the current inventory
      let mostRecentArchiveIndex = construction.inventories_archive.reduce((inventoryIndex, inventory, index, arr) => {
        return inventory.year > inventoryIndex ? index : inventoryIndex
      }, 0)

      inventoryImages = construction.current_inventory.images

      // swap current_inventory with most recent inventory
      construction.current_inventory = construction.inventories_archive[mostRecentArchiveIndex]
      // remove from archive what was the most recent inventory
      construction.inventories_archive.splice(mostRecentArchiveIndex, 1)

    }else{
      return next(new Error("Nu exista inventar pentru anul "+year))
    }


    construction.save(function (err, newConstruction){
      if(err) return next(err)


      if(inventoryImages.length){
        // delete inventory images
        let invImagesLean = JSON.parse(JSON.stringify(inventoryImages)) // dump mongoose "magic"
        deleteConstructionInventoryImages(invImagesLean, function(err, res){ })
      }

      db.Construction.getFullConstruction(id, function(err, updatedConstr){
        res.send(updatedConstr)
      })
    })

  })
})


router.route('/constructions/:id/inventory/:year/images')

.put((req, res, next) => {  // ===================  ADD NEW IMAGES TO AN EXISTING INVENTORY ===================
  const id = req.params.id
  const year = req.params.year
  const images = req.body.images

  getConstructionWithInventory(id, year, function(err, construction){
    if(err) return next(err)

    let inventory = null

    if(construction.current_inventory.year == year){
      inventory = construction.current_inventory
    }else{
      inventory = construction.inventories_archive.find( inv => { return inv.year == year })
    }

    if(inventory){
      inventory.images.push(...images)
      construction.save(function (err, c){
        if(err)  return next(err)

        db.Construction.getFullConstruction(id, function(err, updatedConstr){
          res.send(updatedConstr)
        })
      })
    }else{
      next(new Error("Constructia nu are inventar pentru anul "+year))
    }

  })

})

.delete((req, res, next) => {
  const id = req.params.id
  const year = req.params.year
  const image = req.body


  getConstructionWithInventory(id, year, function(err, construction){
    if(err) return next(err)

    let inventory = null

    if(construction.current_inventory.year == year){
      inventory = construction.current_inventory
    }else{
      inventory = construction.inventories_archive.find( inv => { return inv.year == year })
    }


    if(inventory){
      let invIndex = inventory.images.findIndex( e =>  e._id == image._id )

      if(invIndex !== -1){
        inventory.images.splice(invIndex, 1)
      }


      construction.save(function (err, c){
        if(err)  return next(err)

        // delete files (original and resized)
        deleteInventoryImage(image, function(err, deleteResult){
          if(err) return next(err)

          db.Construction.getFullConstruction(id, function(err, updatedConstr){
            res.send(updatedConstr)
          })
        })

      })
    }else{
      next(new Error("Constructia nu are inventar pentru anul "+year))
    }
  })
})



router.route('/constructions/:id/inventory')

.post((req, res, next) => { // ===================  ADD NEW INVENTORY TO CONSTRUCTION ===================
  const id = req.params.id

  if(ObjectId.isValid(id)){
    let data = req.body

    db.Construction.findById( id , function(err, construction){
      if(err) return next(err)

      if(!construction){
        return next(new Error("No construction with this id"))
      }

      // check if an inventory with same year already exists
      let existsIndex = construction.inventories_archive.findIndex(e => { return e.year == data.year } )

      if(existsIndex != -1 || construction.current_inventory.year == data.year){
        return res.send({error: "Exista deja un inventar pentru anul "+ data.year })
      }


      let invYs = ys.calculateYs(construction, data)
      data.ys = invYs

      if(data.year < construction.current_inventory.year){
        construction.inventories_archive.push(data)
      }else{
        construction.inventories_archive.push(construction.current_inventory)
        construction.current_inventory = data
      }

      construction.save(function(err, newConstruction){
        if(err) return next(err)

        db.Construction.getFullConstruction(id, function(err, updatedConstr){
          res.send(updatedConstr)
        })
      })
    })
  }else{
    next(new Error("Invalid construction id"))
  }

})






router.route('/upload-images')

.post((req, res, next) => {  // =================== UPLOADING IMAGES FOR AN INVENTORY (NEW OR EXISTENT) ===================

  let relPathInsideUploadDir = getRelPathInsideUploadDir()




  // check if tmp folder exists for initial upload
  if(!fs.existsSync(tmpUploadPath)){
    mkdirp.sync(tmpUploadPath, 0744);
  }

  // check if current year/month folder exists
  let imgUploadPath = uploadDirPath + '/' + relPathInsideUploadDir
  if(!fs.existsSync(imgUploadPath)){
    mkdirp.sync(imgUploadPath, 0744);
  }


  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tmpUploadPath)
    }
  })


  let upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      let accetpedFormats = [ 'jpeg', 'png', 'tiff']
      var ext = mime.extension(file.mimetype)

      if(accetpedFormats.indexOf(ext) === -1) {
        return callback(new Error('Pentru upload sunt permise doar imagini (jpeg, png, tiff).'))
      }
      callback(null, true)
    }
  }).array('inventoriesImages')


  upload(req, res, function(err){
    if(err) return next(err)

    async.map(req.files,
      function(file, cb){
        let imgName = file.filename + '.' + mime.extension(file.mimetype)

        let imgFullPathWithName =  imgUploadPath + '/' + imgName

        // move img files and rename
        mv(file.path, imgFullPathWithName, function(err){
          if(err) return next(err)

          let imgData = {
            relPath: relPathInsideUploadDir,
            original: imgName
          }

          // resize uploade image according to config file
          resizeImage(imgFullPathWithName, config.images.resize, function(err, res){
            if(err) return next(err)

            Object.assign(imgData, res)

            cb(null, imgData)
          })
        })
      },
      function(err, results){
        if(err) return next(err)

        res.send(results)
      }
    )
  })



})



// ===================== CHARTS =========================

router.route('/charts/ys-distribution-condition')
.get((req, res, next) => {   // =================== GET Ys DISTRIBUTION BASED ON CONDITION ===================

    let q = req.query

    parseQueryToFilters(q, function(err, filters){
      if(err) return next(err)

      console.log('filters ', filters)

      db.Construction.aggregate([
              { $match: filters },

              { $project:
                {
                  current_inventory: 1,

                  condition: {
                    $switch: {
                      branches: [
                         { case: { $and: [ { $gte: ["$current_inventory.ys", 0  ] }, { $lte: ["$current_inventory.ys", 20 ] } ] },  then: '1_interval_0_20' } ,
                         { case: { $and: [ { $gt: ["$current_inventory.ys", 20 ] }, { $lte: ["$current_inventory.ys", 40 ] } ] }, then: '2_interval_20_40' },
                         { case: { $and: [ { $gt: ["$current_inventory.ys", 40 ] }, { $lte: ["$current_inventory.ys", 60 ] } ] }, then: '3_interval_40_60'},
                         { case: { $and: [ { $gt: ["$current_inventory.ys", 60 ] }, { $lte: ["$current_inventory.ys", 80 ] } ] }, then: '4_interval_60_80'},
                         { case: { $and: [ { $gt: ["$current_inventory.ys", 80 ] }, { $lte: ["$current_inventory.ys", 100 ] } ] }, then: '5_interval_80_100'},
                      ],
                      default: '6_no_group_found'
                    }
                  }
                }
              },

              {
                $group: {
                  _id: "$condition",
                  count: { $sum: 1 },
                  avgYs: { $avg: "$current_inventory.ys"}
                }
              },

              {
                $sort: {
                  _id: 1
                }

              }


            ],

          function(err, results){
            if(err) return next(err)
            res.send(results)
          })
    })
  })


  router.route('/charts/ys-distribution-age')
  .get((req, res, next) => {   // =================== GET Ys DISTRIBUTION BASED ON CONSRUCTION YEAR AGE ===================

      let q = req.query

      parseQueryToFilters(q, function(err, filters){
        if(err) return next(err)

        //console.log('filters ', filters)

        db.Construction.aggregate([
                { $match: filters },

                { $project:
                  {
                    current_inventory: 1,
                    gd: 1
                  }
                },

                {
                  $group: {
                    _id: "$gd.construction_year",
                    count: { $sum: 1 },
                    avgYs: { $avg: "$current_inventory.ys"}
                  }
                },

                {
                  $sort: {
                    _id: -1
                  }
                }

              ],

            function(err, results){
              if(err) return next(err)
              res.send(results)
            })
      })
    })


  router.route('/charts/ys-distribution-decade')
  .get((req, res, next) => {   // =================== GET Ys DISTRIBUTION BASED ON CONSRUCTION YEAR DECADE ===================

      let q = req.query

      parseQueryToFilters(q, function(err, filters){
        if(err) return next(err)

        console.log('filters ', filters)

        db.Construction.aggregate([
                { $match: filters },

                { $project:
                  {
                    current_inventory: 1,
                    gd: 1,
                    decade: { $multiply: [ { $floor :{ $divide: ["$gd.construction_year", 10]}}, 10] }
                  }
                },

                {
                  $group: {
                    _id: "$decade",
                    count: { $sum: 1 },
                    avgYs: { $avg: "$current_inventory.ys"}
                  }
                },

                {
                  $sort: {
                    _id: -1
                  }
                }

              ],

            function(err, results){
              if(err) return next(err)
              res.send(results)
            })
      })
    })


    router.route('/charts/ys-distribution-basin')
    .get((req, res, next) => {   // =================== GET Ys DISTRIBUTION BASED ON CONSRUCTION BASIN CODE ===================

        let q = req.query


        parseQueryToFilters(q, function(err, filters){
          if(err) return next(err)

          async.parallel({
            totalConstructions: function(cb){
              db.Construction.count( filters , cb )
            },

            constructionsArr: function(cb){
              db.Construction.aggregate([
                      { $match: filters },

                      { $project:
                        {
                          type: 1,
                          current_inventory: 1,
                          gd: 1
                        }
                      },

                      {
                        $group: {
                          _id: "$gd.cadastral_code",
                          count: { $sum: 1 },
                          countTrans: { $sum: { $cond: [ { $eq: ["$type", "trans"] },  1,  0 ] }  } ,
                          avgYs: { $avg: "$current_inventory.ys" }
                        }
                      }

                    ],

                  function(err, results){
                    if(err) return cb(err)
                    db.Cadastral.populate(results, { path: "_id" }, function(err, populateRes){
                      if(err) return cb(err)

                      cb(null, populateRes)
                    })
                  }
                )
            },
          },

            function(err, result){
              if(err) return next(err)
              console.log('result total + constArr ', result)
              res.send(result)
            }
          )


        })
      })






      router.route('/charts/ys-distribution-ye')
      .get((req, res, next) => {   // =================== GET Ys DISTRIBUTION BASED ON Ye ===================

          let q = req.query

          parseQueryToFilters(q, function(err, filters){
            if(err) return next(err)

            console.log('filters ', filters)

            db.Construction.aggregate([
                    { $match: filters },

                    { $project:
                      {
                        current_inventory: 1,
                        cd: 1,

                        ye_group: {
                          $switch: {
                            branches: [
                               { case: { "$eq": ["$cd.dam.ye", 0 ]  } ,  then: '1_traverse' } ,
                               { case: { $and: [ { $gt: ["$cd.dam.ye", 0 ] }, { $lte: ["$cd.dam.ye", 2 ] } ] }, then: '2_praguri' },
                               { case: { $gt: ["$cd.dam.ye", 2 ]  }, then: '3_baraje'},

                            ],
                            default: '4_no_group_found'
                          }
                        }
                      }
                    },

                    {
                      $group: {
                        _id: "$ye_group",
                        count: { $sum: 1 },
                        avgYs: { $avg: "$current_inventory.ys"}
                      }
                    },

                    {
                      $sort: {
                        _id: 1
                      }

                    }


                  ],

                function(err, results){
                  if(err) return next(err)
                  res.send(results)
                })
          })
        })

        router.route('/charts/ys-distribution-materials')
        .get((req, res, next) => {   // =================== GET Ys DISTRIBUTION BASED ON MATERIALS ===================

            let q = req.query

            parseQueryToFilters(q, function(err, filters){
              if(err) return next(err)

              console.log('filters ', filters)

              db.Construction.aggregate([
                      { $match: filters },

                      { $project:
                        {
                          current_inventory: 1,
                          cd: 1,
                        }
                      },

                      {
                        $group: {
                          _id: "$cd.dam.mat_main_body",
                          count: { $sum: 1 },
                          avgYs: { $avg: "$current_inventory.ys"}
                        }
                      },

                      {
                        $sort: {
                          _id: 1
                        }

                      }


                    ],

                  function(err, results){
                    if(err) return next(err)
                    res.send(results)
                  })
            })
          })



// ===================== DOWNLOAD CONSTRUCTIONS LIST =========================

router.route('/download/constructions-list')
.get((req, res, next) => {

  let q = req.query

  let fields = []
  let data = []


  // if no construction type specified
  if(!q.type) {
    fields.push("Eroare")
    data.push( "Nu a fost specificat tipul de constructiei: transversala sau canal de evacuare.")

    return json2csv({ data: data, fields: fields }, function(err, csv) {
      res.setHeader('Content-disposition', 'attachment; filename=data.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    });
  }

  // if everything is OK, construct first two rows

  let constrType = q.type == 'trans' ? 'Transversala' : "Longitudinala"

  fields.push( 'type')

  let secondRowWithTitles = { 'type': 'Tip'}

  let constrGeneralDataFields = getConstructionGeneralDataFields()
  let damFields = getTransversalConstructionDataFields()

  let inventoryFields = getInventoryFields()

  let damInventoryFields = getDamInventoryFields()
  let damInventoryFinalSpurFields = getDamInventoryFinalSpurFields()


  let longConstrFields = getLongConstrFields()
  let sectorFields = getSectorFields()
  let sectorSpurFields = getSectorSpurFields()

  let sectInvFields = getSectorInventoryFields()
  let sectSpurInvFields = getSectorSpurInventoryFields()

  let longFinalSpurFields = getLongFinalSpurFields()
  let longFinalSpurInvFields = getLongFinalSpurInventoryFields()

  constrGeneralDataFields.forEach(e => {
    fields.push(e.field)
    secondRowWithTitles[e.field] = e.name
  })



  if(q.type == 'trans'){

    let transversalFields = [ ...damFields, ...inventoryFields, ...damInventoryFields, ...damInventoryFinalSpurFields ]

    transversalFields.forEach(e => {
      fields.push(e.field)
      secondRowWithTitles[e.field] = e.name
    })
  }else{
    let longFields = [ ...longConstrFields, ...sectorFields, ...sectorSpurFields, ...longFinalSpurFields, ...sectInvFields, ...sectSpurInvFields, ...longFinalSpurInvFields ]

    longFields.forEach(e => {
      fields.push(e.field)
      secondRowWithTitles[e.field] = e.name
    })

  }


  data.push(secondRowWithTitles)

  parseQueryToFilters(q, function(err, filters){
    if(err) return next(err)

      db.Construction.find(filters)
      .populate('gd.cadastral_code')
      .exec(function(err, constrList){
          if(err) return next(err)

          async.eachLimit(
            constrList,
            10,
            function(construction, cb){
              construction.setAdminlocation(function(err, cc){
                if(err) return cb(err)

                let constrObj = cc.toObject()
                let item =  { 'type': constrType }

                item = prepareDownloadParseGeneralDataFields(constrObj, item)



                if(q.type == 'trans'){
                  item = prepareDownloadParseTransversalDataFields(constrObj, item)

                  item = prepareDownloadParseInvDataFields(constrObj, item)

                  item = prepareDownloadParseInvDamDataFields(constrObj, item)

                  item = prepareDownloadParseInvDamFinalSpurDataFields(constrObj, item)

                  data.push(item) // because on transversal one construction == one row

                }else{
                  item = prepareDownloadParseLongConstrDataFields(constrObj, item) // general long constr data

                  item = prepareDownloadParseLongitudinalFinalSpurDataFields(constrObj, item) // final spur

                  item = prepareDownloadParseLongitudinalInvFinalSpurDataFields(constrObj, item) // final spur inventory

                  let sectorRows = prepareDownloadSectorsDataFields(constrObj)
                  let sectorInvRows = prepareDownloadSectorsInventoryDataFields(constrObj)

                  // merge sector data with inventory data
                  let sectData = []

                  sectorRows.forEach( (e, index) => {
                    sectData.push( Object.assign(e, sectorInvRows[index]) )
                  })

                  let firstSectRow = sectData.splice(0, 1)

                  item = Object.assign(item, firstSectRow[0])

                  data.push(item, ...sectData)
                }



                cb(null, 2)
              })
            },

            function(err){
            if(err) return next(err)
            console.log('each limit finsihed')
            //console.log('data ', data)
              console.log('data length', data.length)

            json2csv({ data: data, fields: fields }, function(err, csv) {
              res.setHeader('Content-disposition', 'attachment; filename=data.csv');
              res.set('Content-Type', 'text/csv');
              res.status(200).send(csv);
            });
          })
      })

  })

});

// ===============================================================================
//                          Helper functions
// ===============================================================================




function present(){
  var time = process.hrtime();
  return time[0] * 1e3 + time[1] / 1e6;
}

// inside upload dir the files are organized in /year/month directories
function getRelPathInsideUploadDir(){
  return  new Date().getFullYear()+'/'+(new Date().getMonth() + 1)
}


// resize img file according with config specifications in the same directory
function resizeImage(imgFullPathWithName, resizeConf, callback){

  let directory = path.dirname(imgFullPathWithName)
  let extName = path.extname(imgFullPathWithName) // contain the dot, .jpeg
  let fileBasename = path.basename(imgFullPathWithName, extName)

  // resize img file according with config specifications
  async.map(resizeConf,
    async.reflect(function(imgConf, cb){

      let size = imgConf.name
      let newFileName = fileBasename + '_' + size  + extName

      try {
        sharp(imgFullPathWithName)
        .resize(imgConf.size[0], imgConf.size[1])
        .max()
        .withoutEnlargement()
        .toFile(directory + '/' + newFileName)
        .then(function(resizeImgData){
          cb(null,{size: size, fileName:  newFileName} )
        })
      } catch (e) {
        cb(e)
      }
    }),

    function(err, res){

      let resObj = {}
      res.forEach(img => {
        if(img.value){
          resObj[img.value.size] = img.value.fileName
        }
      })
      callback(null, resObj)
    }
  )
}


// delete images from upload directory
// images are specified as an array of files with path relative to the upload dierectory
// return number of files deleted successfuly
function deleteImages(imgRelPathArr, callback){
  if(! Array.isArray(imgRelPathArr)) return callback(new Error("Array of files expected in deleteImages"))

  let imgAbsPathArry = imgRelPathArr.map(relPath => uploadDirPath + '/' + relPath )

  async.map(
    imgAbsPathArry,
    async.reflect(
      function(f, cb){
        fs.stat(f, function(err, stats){
          if(err) return cb(err)

          fs.unlink(f, cb)
        })
      }
    ),

    function(err, results){
      if(err) return callback(err)

      let successDeleted = 0

      results.forEach(e => {
        if(e.value){
          successDeleted++
        }
      })

      callback(null, successDeleted)
    }
  )
}


/*
* Delete one image from an inventory that are specified as an inventory imgObj ex: { relPath: , original: ....}
*/
function deleteInventoryImage(imgObj, callback){

  let imageFilesArr = []
  let imgPath = imgObj.relPath

  // check if it is a imgObj
  if( imgObj.original === undefined || imgObj.relPath === undefined || imgObj._id === undefined){
    return callback(new Error("Inventory imgObject expected"))
  }

  let keys = Object.keys(imgObj)

  keys.forEach(e => {
    if(e != 'relPath' && e != '_id'){
      imageFilesArr.push(imgPath + '/' + imgObj[e] )
    }
  })

  deleteImages(imageFilesArr, callback)
}




function deleteConstructionInventoryImages(imagesArr, callback){
    if(! Array.isArray(imagesArr)) return callback(new Error("Array of images Object expected in deleteConstructionInventoryImages"))

    async.map(imagesArr,
      deleteInventoryImage,
      function(err, res){
        callback(err, res)
      })
}



  function parseQueryValue(target, val, type){
    if(val === undefined || (Array.isArray(val) && val.length == 0 )) return

    if(type == 'bool'){
      if(Array.isArray(val)){
        val.forEach( e => e = e === true || e == 'true' )
      }else{
        val = val === true || val == 'true'
      }
    }

    if(type == 'number'){
      if(Array.isArray(val)){
        val.forEach( e => e = isNaN( parseFloat(e) ) ? 0 : parseFloat(e) )
      }else{
        val = isNaN( parseFloat(val) ) ? 0 : parseFloat(val)
      }
    }

    if(Array.isArray(val)){
      this[target] = { $in: val }
    }else{
      this[target] = val
    }
  }


  function isNumeric(val){
    return val !== undefined && !isNaN(parseFloat(val)) && isFinite(val)
  }


  function parseQueryRange(target, queryMin, queryMax, property){
    if((queryMin === undefined && queryMax === undefined) || (!isNumeric(queryMin) && !isNumeric(queryMax))) return

    let min = isNumeric(queryMin) ? parseFloat(queryMin) : undefined
    let max = isNumeric(queryMax) ? parseFloat(queryMax) : undefined

    let q = {}

    if(min !== undefined && max !== undefined){
      if(min == max){
        q = max
      }else{
        q = { $gte: Math.min(min, max), $lte: Math.max(min, max) }
      }
    }else{
      if(min !== undefined){
        q = { $gte: min}
      }
      if(max !== undefined){
        q = { $lte: max }
      }
    }

    if(property){
      let pro = {}
      pro[property] = q
      this[target] = pro
    }else{
      this[target]  = q
    }
  }


  function parseQueryAdminlocation(countyId, cityId, cb ){
    let t1 = present()
    if(!countyId && !cityId){
      return cb(null, null)
    }
    if(cityId){
      cb(null, { 'gd._adminlocation': ObjectId(cityId) })
    }else{
      db.Adminlocation.find({ parent: ObjectId(countyId) }, ' _id ',  function(err, cities){
        if(err) return cb(err)
        let citiesIdsArr = []
        cities.map(c => citiesIdsArr.push(ObjectId(c._id)))
        let t2 =present()
        // console.log('perfomance parseQueryAdminlocation ' + (t2-t1))
        cb(null, { 'gd._adminlocation': { $in: citiesIdsArr } } )
      })
    }
  }


  function parseQueryCadastralCode(deepest_cadastral_code, cb ){
    let t1 = present()
    if(!deepest_cadastral_code || !ObjectId.isValid(deepest_cadastral_code)){
      return cb(null, null)
    }

    db.Cadastral.find({ ancestors: deepest_cadastral_code }, '_id').lean().exec( function(err, childrenIdsObj){
      if(err) return cb(err)

      let idsArr = childrenIdsObj.map(e => e._id)

      idsArr.push(deepest_cadastral_code)


      let t2 =present()
      // console.log('perfomance parseQueryCadastralCode ' + (t2-t1))
      cb(null, { 'gd.cadastral_code': { $in: idsArr } })
    })

  }

  function getAdminlocationId(countyId, city, cb){
    if(city && typeof city == "string"){
      city = city.trim()
    }

    if(countyId){
      db.Adminlocation.findById( ObjectId(countyId), function(err, county){
        if(!county){
          return cb(null, null)
        }
        db.Adminlocation.findOne({ name: city, parent: ObjectId(countyId) }, function(err, result){
          if(!result){
            db.Adminlocation.create({ name: city, parent: ObjectId(countyId) }, function(err, newCity){
              cb(err, newCity._id)
            })
          }else{
            cb(err, result._id)
          }
        })
      })
    }else{
      cb(null, null)
    }
  }


  function getAdminlocationById(id, callback){

    if(ObjectId.isValid(id)){
      db.Adminlocation.findOneById(id).populate('parent').exec( function(err, result){
        if(err) return callback(err)
        let adminlocation = {}
        adminlocation.city = result.name
        adminlocation.city_id = id
        adminlocation.county = result.parent.name
        adminlocation.county_slug = result.parent.slug
        adminlocation.county_id = result.parent.id

        return callback(null, adminlocation)
      })
    }else{
      callback(null, null)
    }
  }



  function getCadastralCodeId(codeArr, callback){
    // first element in array is the level_0 _id, the rest are the names of the cadastrals taxonomy
    if(Array.isArray(codeArr) && ObjectId.isValid(codeArr[0])){

      // get level_0
      db.Cadastral.findById(codeArr[0], function(err, level_0){
        if(err || level_0 == null) return callback(err) // level_0 should not be added after installation, they are fixed

        // remove all empty elements in codeArr
        let emptyElIndex = codeArr.findIndex(e => { return e === null || ( typeof e == 'string'   && e.trim() == '')} )
        if(emptyElIndex != -1 ){
          codeArr.splice(emptyElIndex)
        }

        let codeNamesArr = codeArr.slice(1)
        // remove spaces and convert to lowercases
        codeNamesArr = codeNamesArr.map(e => {
          e +="" // convert to string
          return e = e.trim().toLowerCase()
        })


        if(codeArr.length == 1){ // if only one level deep, stop here
          return callback(null, codeArr[0])
        }


        let ancestors = level_0.ancestors // []
        let breadcrumb = level_0.breadcrumb
        let parentId = codeArr[0]

        async.reduce(codeNamesArr, codeArr[0], function(parentId, name, cb) {

          db.Cadastral.findOne({name: name, parent: ObjectId(parentId)}, function(err, cad){
            if(err) return  callback(err)

            if(cad){

              parentId = cad._id
              ancestors = cad.ancestors
              breadcrumb = cad.breadcrumb

              cb(null, cad._id)
            }else{
              let newCad = new db.Cadastral({
                name: name,
                slug: name,
                parent: ObjectId(parentId),
                breadcrumb: breadcrumb + '-'+name,
                ancestors: [...ancestors, ObjectId(parentId)]
              })

              newCad.save(function(err, success){
                if(err) return cb(err)

                parentId = success._id
                ancestors = success.ancestors
                breadcrumb = success.breadcrumb

                return cb(null, success._id)
              })
            }
          })

        },
        function(err, result) {
          if(err) return callback(err)

          callback(null, result)
        }
      )

    })


  }else{
    callback(new Error("Array expected for cadastral codes"), null)
  }
}


function getConstructionWithInventory(constructionId, inventoryYear, callback){
  if(!ObjectId.isValid(constructionId)){
    return callback(new Error("Invalid construction id getConstructionWithInventory()"))
  }

  db.Construction.findById(constructionId, function(err, construction){
    if(err){
      return callback(err)
    }

    if(!construction){
      return callback(new Error("No construction with this id"))
    }

    // check if an inventory with same year already exists
    let existsIndex = construction.inventories_archive.findIndex(e => { return e.year == inventoryYear } )

    if(existsIndex == -1 && construction.current_inventory.year != inventoryYear){
      return callback(new Error("Constructia cu id-ul " + constructionId + " nu are inventar pentru anul "+ data.year))
    }

    callback(null, construction)
  })

}

// Parse the query object to mongoose filters
function parseQueryToFilters(q, callback){

    let filters = {}

    let deepest_cadastral_code = null

    for(let i = 0; i < 6; i++){
      if(q['cc_l_'+i]){
        deepest_cadastral_code = q['cc_l_'+i]
      }
    }


    // construction type
    parseQueryValue.apply(filters, [ 'type' , q.type] )

    // year execution
    parseQueryRange.apply(filters, ['gd.construction_year', q.construction_year_from, q.construction_year_to])

    // year inventory
    parseQueryRange.apply(filters, ['current_inventory.year', q.inventory_year_from, q.inventory_year_to])

    // ys
    parseQueryRange.apply(filters, ['current_inventory.ys', q.ys_from, q.ys_to])

    // adminlocation



    //  LongitudinalConstruction
    if(q.type == 'long'){
      // has_final_spur
      parseQueryValue.apply(filters, ['cd.has_final_spur', q.has_final_spur, 'bool'])



      // construction material sector apron
      parseQueryValue.apply(filters, ['cd.sectors.mat_sect_apron', q.mat_sect_apron])
      // construction material sector lateral walls
      parseQueryValue.apply(filters, ['cd.sectors.mat_sect_walls', q.mat_sect_walls])
      // construction material sector spurs
      parseQueryValue.apply(filters, ['cd.sectors.spurs.mat_sect_spur', q.mat_sect_spur])

      // total_length
      parseQueryRange.apply(filters, ['cd.total_length', q.total_length_from, q.total_length_to])
      // Ls
      parseQueryRange.apply(filters, ['cd.sectors.sector_length', q.Ls_from, q.Ls_to])
      // Hs
      parseQueryRange.apply(filters, ['cd.sectors.sector_deep', q.Hs_from, q.Hs_to])
      // bs
      parseQueryRange.apply(filters, ['cd.sectors.apron_width', q.bs_from, q.bs_to])

    }

    //  TransversalConstruction
    if(q.type == 'trans'){
      // has_final_spur
      parseQueryValue.apply(filters, ['cd.has_final_spur', q.has_final_spur, 'bool'])
      // has_final_spur
      parseQueryValue.apply(filters, ['cd.has_confuseur', q.has_confuseur, 'bool'])
      // has_final_spur
      parseQueryValue.apply(filters, ['cd.has_apron', q.has_apron, 'bool'])


      // Ye
      parseQueryRange.apply(filters, ['cd.dam.ye', q.ye_from, q.ye_to])
      // H
      parseQueryRange.apply(filters, ['cd.dam.h', q.h_from, q.h_to])
      // Lr
      parseQueryRange.apply(filters, ['cd.dam.lr', q.lr_from, q.lr_to])

      //transversal_type
      parseQueryValue.apply(filters, ['cd.dam.transversal_type', q.transversal_type])
      // disip_type
      parseQueryValue.apply(filters, ['cd.dam.disip_type', q.disip_type])

      // construction material mainBody
      parseQueryValue.apply(filters, ['cd.dam.mat_main_body', q.mat_main_body])
      // construction material wings
      parseQueryValue.apply(filters, ['cd.dam.mat_wings', q.mat_wings])
      // construction material apron
      parseQueryValue.apply(filters, ['cd.dam.mat_apron', q.mat_apron])

      // construction material counter dam
      parseQueryValue.apply(filters, ['cd.dam.mat_counter_dam', q.mat_counter_dam])
      // construction material side walls
      parseQueryValue.apply(filters, ['cd.dam.mat_side_walls', q.mat_side_walls])
      // construction material final spur
      parseQueryValue.apply(filters, ['cd.final_spur.mat_final_spur', q.mat_final_spur])
    }


    async.parallel(
      [
        async.reflect(function(cb) {
          parseQueryCadastralCode(deepest_cadastral_code, cb)
        }),

        async.reflect(function(cb) {
          parseQueryAdminlocation(q.county, q.city, cb)
        })
      ],
      function(err, results){
        if(err) return callback(err)

        let t2 =present()
        // console.log('perfomance   async.parallel ' + (t2-t1))


        if(!results[0].error && results[0].value != null){
          Object.assign(filters, results[0].value)
        }

        if(!results[1].error && results[1].value != null){
          Object.assign(filters, results[1].value)
        }

        callback(null, filters)
      })
}

// ================================ DOWNLOAD ================================


// ============ Fields ============
function getConstructionGeneralDataFields(){
  return [
    {field: "cadastral_code", name: "Cod Cadastral" },
    {field: "construction_code", name: "Cod Lucrare"},
    {field: "basin_name", name: "Nume bazin" },
    {field: "geolocation.lat", name: "Latitudine" },
    {field: "geolocation.long", name: "Longitudine" },

    {field: "county", name: "Judet" },
    {field: "city", name: "Localitate" },

    {field: "construction_year", name: "An constructie" },

    {field: "reparation_years", name: "Ani reparatii" },
    {field: "inventory_years", name: "Ani inventariere" },



    {field: "owner", name: "Proprietar" },

    {field: "protected_area", name: "Arie protejata" },
    {field: "protected_area_name", name: "Nume arie protejata" },

  ]
}

function getTransversalConstructionDataFields(){
  return [
    {field: "has_apron", name: "Are radier" },
    {field: "has_confuseur", name: "Are confuzor"},
    {field: "has_final_spur", name: "Are pinten terminal" },


    {field: "transversal_type", name: "Tip lucrare" },
    {field: "ye", name: "Ye" },
    {field: "h", name: "H" },
    {field: "a", name: "a" },
    {field: "b", name: "B" },

    // apron
    {field: "lr", name: "Lr" },
    {field: "br", name: "Br" },
    {field: "disip_type", name: "Tip disipator" },
    {field: "hz", name: "Hz" },
    {field: "apron_teeth_no", name: "Numar total dinti radier" },

  // confuseur
    {field: "lc", name: "Lc" },
    {field: "bc", name: "Bc" },


    // construction materials
    {field: "mat_main_body", name: "Mat corp" },
    {field: "mat_wings", name: "Mat aripi" },
    {field: "mat_apron", name: "Mat radier" },
    {field: "mat_counter_dam", name: "Mat contrabaraj" },
    {field: "mat_side_walls", name: "Mat ziduri laterale" },

    // final spur
    {field: "mat_final_spur", name: "Mat pinten terminal" },
    {field: "spur_length", name: "Lungime pinten terminal" }

  ]
}

function getInventoryFields(){
  return [
    { field: "year", name: "Anul ultimei inv." },
    { field: "ys", name: "Ys" },
  ]
}

function getDamInventoryFields(){
return [
  // mainBody damages
  { field: "dec_left", name: "Dec. stg" },
  { field: "dec_right", name: "Dec. dr" },
  { field: "af_height", name: "Afuieri H(m)" },
  { field: "af_percent", name: "Afuieri %" },
  { field: "h_crak_dev_nr", name: "Fis. oriz. nr. z. deversata" },
  { field: "h_crak_dev_l", name: "Fis. oriz. lungime z. deversata" },
  { field: "v_crak_dev_nr", name: "Fis. ver. nr. z. deversata" },
  { field: "v_crak_dev_l", name: "Fis. vert. lungime z. deversata" },
  { field: "h_crak_undev_nr", name: "Fis. oriz. nr. z. ne-deversata" },
  { field: "h_crak_undev_l", name: "Fis. oriz. lungime z. ne-deversata" },
  { field: "v_crak_undev_nr", name: "Fis. vert. nr. z. ne-deversata" },
  { field: "v_crak_undev_l", name: "Fis. vert. lungime z. ne-deversata" },
  { field: "detach_dev_percent", name: "Desprinderi zonă deversată %" },
  { field: "detach_undev_left_percent", name: "Desprinderi z, nedeversată stanga %" },
  { field: "detach_undev_right_percent", name: "Desprinderi z, nedeversată dreapta %" },
  { field: "erosion_height", name: "Eroziuni adancime (cm)" },
  { field: "erosion_percent", name: "Eroziuni % " },

  // apron damages
  { field: "apron_crack_nr", name: "Rad. fis. nr" },
  { field: "apron_crack_percent", name: "Rad. fis. %" },
  { field: "apron_af_height", name: "Rad. af. inalt(m)" },
  { field: "apron_af_percent", name: "Rad. af. %" },
  { field: "apron_detach_percent", name: "Rad despr. %" },
  { field: "apron_teeth_detach_nr", name: "Rad. dinti despr." },
  { field: "apron_detach_counter_dam_percent", name: "Rad. contr. despr. %" },
  { field: "apron_erosion_height", name: "Rad. eroziune adancime" },
  { field: "apron_erosion_percent", name: "Rad. eroz. %" },

  // sidewall damages
  { field: "sidewall_left_horiz_craks_nr", name: "Zid cond stg. fis. oriz. nr." },
  { field: "sidewall_left_horiz_length", name: "Zid cond stg. fis. oriz. lungime" },
  { field: "sidewall_left_vert_craks_nr", name: "Zid cond stg. fis. vert. nr." },
  { field: "sidewall_left_vert_length", name: "Zid cond stg. fis. ver. lungime" },
  { field: "sidewall_left_displaced_percent", name: "Zid cond stg. despr. %" },
  { field: "sidewall_left_abrasion_deep", name: "Zid cond stg. eroz. (m)" },
  { field: "sidewall_left_abrasion_percent", name: "Zid cond stg. eroz. %" },


  { field: "sidewall_right_horiz_craks_nr", name: "Zid cond dr. fis. oriz. nr." },
  { field: "sidewall_right_horiz_length", name: "Zid cond dr. fis. oriz. lungime" },
  { field: "sidewall_right_vert_craks_nr", name: "Zid cond dr. fis. vert. nr." },
  { field: "sidewall_right_vert_length", name: "Zid cond dr. fis. ver. lungime" },
  { field: "sidewall_right_displaced_percent", name: "Zid cond dr. despr. %" },
  { field: "sidewall_right_abrasion_deep", name: "Zid cond dr. eroz. (m)" },
  { field: "sidewall_right_abrasion_percent", name: "Zid cond dr. eroz. %" },


  // disfunctionalities
  { field: "disf_colmat_deversor_percent", name: "Disf. colmat. deversor" },
  { field: "disf_colmat_apron_su_percent", name: "Disf. colmat. rad %SU" },
  { field: "disf_colmat_apron_srad_percent", name: "Disf. colmat. rad %Srad" },
  { field: "disf_hat", name: "Înălțime aterisament" },
  { field: "disf_gal_type", name: "Granulometrie aluviuni" },
  { field: "disf_veget_amonte", name: "Vegetație lemn amont" },
  { field: "disf_veget_aval", name: "Vegetație lemn aval" },
  { field: "disf_section_dim_perecent", name: "Reducere secțiune %" },
]
}

function getDamInventoryFinalSpurFields(){
  return [
    {field: "final_spur_decastr_left", name: "Pinten terminal dec. stg" },
    {field: "final_spur_decastr_right", name: "Pinten terminal dec. dr" },
    {field: "final_spur_horiz_crack_nr", name: "Pinten terminal fis. oriz nr" },
    {field: "final_spur_horiz_crack_length", name: "Pinten terminal fis. oriz lungime" },
    {field: "final_spur_vert_crack_nr", name: "Pinten terminal fis. vert nr" },
    {field: "final_spur_vert_crack_length", name: "Pinten terminal fis. vert lungime" },
    {field: "final_spur_detach_left_percent", name: "Pinten terminal despr. stg" },
    {field: "final_spur_detach_right_percent", name: "Pinten terminal despr. dr" },
    {field: "final_spur_detach_center_percent", name: "Pinten terminal despr. centru" },
    {field: "final_spur_erosion_height", name: "Pinten terminal eroziune adancime" },
    {field: "final_spur_erosion_percent", name: "Pinten terminal eroziune %" },

  ]
}


function getLongConstrFields(){
  return [
      {field: "sectors", name: "Numar sectoare" },
      {field: "total_length", name: "Lungime totala" },
      {field: "has_final_spur", name: "Are pinten terminal" }
  ]
}


function getSectorFields(){
return [
  {field: "sector_nr", name: "Nr. sector" },
  {field: "nr_of_stairs", name: "Nr. trepte" },
  {field: "sector_length", name: "Lungime" },
  {field: "sector_deep", name: "Adancime" },
  {field: "fruit_guard_wall", name: "Fruct zid garda" },
  {field: "mat_sect_apron", name: "Mat rad sector" },
  {field: "mat_sect_walls", name: "Mat ziduri sect" },
]
}

function getSectorSpurFields(){
  return [
    {field: "spur_nr", name: "Nr. pinten" },
    {field: "mat_sect_spur", name: "Mat. pinten" },
    {field: "spur_sidewall_height", name: "Inaltime pinten" },
    {field: "spur_stair_height", name: "Inaltime treapta" },
    {field: "spur_length", name: "Lungime pinten" },
  ]
}


function getSectorInventoryFields(){
return [
  // apron damages
  {field: "apron_craks_nr", name: "Rad. fis. nr." },
  {field: "apron_damage_percent", name: "Rad. fis. %" },
  {field: "apron_displaced", name: "Rad. desprindere %" },
  {field: "apron_abrasion_deep", name: "Eroz. adancime" },
  {field: "apron_abrasion_percent", name: "Eroz. %" },

  // sidewalls damages
  {field: "sidewall_left_horiz_craks_nr", name: "Zid cond. stg. fis. oriz. nr." },
  {field: "sidewall_left_horiz_length", name: "Zid cond. stg. fis. oriz. lungime" },
  {field: "sidewall_left_vert_craks_nr", name: "Zid cond. stg. fis. vert. nr." },
  {field: "sidewall_left_vert_length", name: "Zid cond. stg. fis. vert. lungime." },
  {field: "sidewall_left_displaced", name: "Zid cond. stg. despr." },
  {field: "sidewall_left_abrasion_deep", name: "Zid cond. stg. eroz. adancime" },
  {field: "sidewall_left_abrasion_percent", name: "Zid cond. stg. eroz. %" },

  {field: "sidewall_right_horiz_craks_nr", name: "Zid cond. dr. fis. oriz. nr." },
  {field: "sidewall_right_horiz_length", name: "Zid cond. dr. fis. oriz. lungime" },
  {field: "sidewall_right_vert_craks_nr", name: "Zid cond. dr. fis. vert. nr." },
  {field: "sidewall_right_vert_length", name: "Zid cond. dr. fis. vert. lungime" },
  {field: "sidewall_right_displaced", name: "Zid cond. dr. despr." },
  {field: "sidewall_right_abrasion_deep", name: "Zid cond. dr. eroz. adancime" },
  {field: "sidewall_right_abrasion_percent", name: "Zid cond. dr. eroz. %" },



  {field: "disf_colmat_su_percent", name: "Disf. colmat. rad %SU" },
  {field: "disf_colmat_srad_percent", name: "Disf. colmat. rad %Srad" },
  {field: "disf_section_dim_perecent", name: "Reducere secţ. aval" }
]
}


function getSectorSpurInventoryFields(){
  return [
    {field: "spur_nr", name: "Nr. pinten"},
    {field: "spur_horiz_craks_nr", name: "Pinten fis. oriz. nr."},
    {field: "spur_horiz_craks_lenght", name: "Pinten fis. oris. lungime"},
    {field: "spur_vert_craks_nr", name: "Pinten fis. vert. nr."},
    {field: "spur_vert_craks_lenght", name: "Pinten fis. vert. lungime"},
    {field: "spur_displaced_left", name: "Pinten despr. stg."},
    {field: "spur_displaced_right", name: "Pinten despr. dr."},
    {field: "spur_displaced_center", name: "Pinten despr. centru"},
    {field: "spur_abrasion_percent", name: "Pinten eroz. %"},
    {field: "spur_abrasion_deep", name: "Pinten eroz. adancime"},
  ]
}

function getLongFinalSpurFields(){
  return [
    {field: "mat_final_spur", name: "Mat pinten terminal" },
    {field: "spur_length", name: "Lungime pinten terminal" },
    {field: "sidewall_height", name: "Inaltime zid cond. pinten terminal " }
  ]
}

function getLongFinalSpurInventoryFields(){
  return [
    {field: "final_spur_decastr_left", name: "Pinten terminal decastr. stg." },
    {field: "final_spur_decastr_right", name: "Pinten terminal decastr. dr." },
    {field: "final_spur_afuieri_height", name: "Pinten terminal afuieri inaltime" },
    {field: "final_spur_afuieri_percent", name: "Pinten terminal afuieri %" },

    {field: "final_spur_horiz_craks_nr", name: "Pinten terminal fis. oriz. nr." },
    {field: "final_spur_horiz_craks_lenght", name: "Pinten terminal fis. oriz. lungime" },
    {field: "final_spur_vert_craks_nr", name: "Pinten terminal fis. vert. nr." },
    {field: "final_spur_vert_craks_lenght", name: "Pinten terminal fis. vert. lungime" },

    {field: "final_spur_displaced_left", name: "Pinten terminal desprinderi stg. %" },
    {field: "final_spur_displaced_right", name: "Pinten terminal desprinderi dr. %" },
    {field: "final_spur_displaced_center", name: "Pinten terminal desprinderi centru %" },

    {field: "final_spur_abrasion_deep", name: "Pinten terminal eroziuni adancime" },
    {field: "final_spur_abrasion_percent", name: "Pinten terminal eroziuni %" },
  ]
}


function xx(){
      let x = {field: "", name: "" }
}

// ============ parsing result fields ============
function prepareDownloadParseGeneralDataFields(construction, item){
  let fields = getConstructionGeneralDataFields()

  fields.forEach( e => {

   if( e.field == 'reparation_years' || e.field == 'inventory_years' ){ // this are arrays
     item[e.field] = construction.gd[e.field] && Array.isArray(construction.gd[e.field]) ? construction.gd[e.field].join(', ' ) : ''
   }else if(e.field == 'cadastral_code'){
     item[e.field] = construction.gd[e.field] && construction.gd[e.field].breadcrumb ? construction.gd[e.field].breadcrumb : ''
   }else if(e.field == 'geolocation.lat'){
     item[e.field] = construction.gd.geolocation && construction.gd.geolocation.lat ? parseFloat(construction.gd.geolocation.lat).toFixed(8) : ''
   }else if(e.field == 'geolocation.long'){
     item[e.field] = construction.gd.geolocation && construction.gd.geolocation.long ? parseFloat(construction.gd.geolocation.long).toFixed(8) : ''
   }else if(e.field == 'county'){
     item[e.field] = construction.gd['adminlocation'] && construction.gd.adminlocation.county ? construction.gd.adminlocation.county : ''
   }else if( e.field == 'city'){
     item[e.field] = construction.gd.adminlocation && construction.gd.adminlocation.city ? construction.gd.adminlocation.city : ''
   }else{
     item[e.field] = construction.gd[e.field]
   }

  })
  return item
}


function prepareDownloadParseTransversalDataFields(construction, item){
  let fields = getTransversalConstructionDataFields()

  fields.forEach(e => {
    if( e.field == 'has_apron' || e.field == 'has_confuseur' || e.field == 'has_final_spur'){ // this are booleans
      item[e.field] = construction.cd[e.field] ? construction.cd[e.field] : false
    }else{
      item[e.field] = construction.cd.dam[e.field]
    }

  })

  return item
}


function prepareDownloadParseInvDataFields(construction, item){
  let fields = getInventoryFields()

  fields.forEach(e => {
    item[e.field] = construction.current_inventory[e.field]
  })

  return item
}

function prepareDownloadParseInvDamDataFields(construction, item){
  let fields = getDamInventoryFields()

  fields.forEach(e => {
    item[e.field] = construction.current_inventory.dam[e.field]
  })

  return item
}

function prepareDownloadParseInvDamFinalSpurDataFields(construction, item){
  let fields = getDamInventoryFinalSpurFields()

  fields.forEach(e => {
    item[e.field] = construction.current_inventory.final_spur ? construction.current_inventory.final_spur[e.field] : ''
  })

  return item
}



// ================== Longitudinal constr ============

function prepareDownloadParseLongConstrDataFields(construction, item){
  let fields = getLongConstrFields()

  fields.forEach(e => {
    if(e.field == 'sectors'){
      item[e.field] = construction.cd.sectors.length
    }else{
      item[e.field] = construction.cd[e.field]
    }

  })

  return item
}


function prepareDownloadSectorsDataFields(construction){
  let sectorRows = []

  let sectFields = getSectorFields()
  let spurFields = getSectorSpurFields()

  construction.cd.sectors.forEach(s => {
    let sect = {}

    // add only sectors fields
    sectFields.forEach(e => {
      sect[e.field] = s[e.field]
    })

    // add sector spurs
    let spurArr = []

    if(s.spurs && Array.isArray(s.spurs)){
      s.spurs.forEach(sectSpur => {
        let spurItem = {}
        spurFields.forEach(e => {
          spurItem[e.field] = sectSpur[e.field]
        })
        spurArr.push(spurItem)
      })

      // add on the same row the first spur with the parent sector
      if(spurArr.length){
        let firstSpur = spurArr.splice(0, 1)
        sect = Object.assign(sect, firstSpur[0])
      }
    }

    sectorRows.push(sect, ...spurArr)

  })

  return sectorRows
}


function prepareDownloadSectorsInventoryDataFields(construction){
  let sectorRows = []

  let sectFields = getSectorInventoryFields()
  let spurFields = getSectorSpurInventoryFields()

  construction.current_inventory.sectors.forEach(s => {
    let sect = {}

    // add only sectors fields
    sectFields.forEach(e => {
      sect[e.field] = s[e.field]
    })

    // add sector spurs
    let spurArr = []

    if(s.spurs && Array.isArray(s.spurs)){
      s.spurs.forEach(sectSpur => {
        let spurItem = {}
        spurFields.forEach(e => {
          spurItem[e.field] = sectSpur[e.field]
        })
        spurArr.push(spurItem)
      })

      // add on the same row the first spur with the parent sector
      if(spurArr.length){
        let firstSpur = spurArr.splice(0, 1)
        sect = Object.assign(sect, firstSpur[0])
      }
    }

    sectorRows.push(sect, ...spurArr)
  })

  return sectorRows
}


function prepareDownloadParseLongitudinalFinalSpurDataFields(construction, item){
  let fields = getLongFinalSpurFields()

  fields.forEach(e => {
    item[e.field] = construction.current_inventory.final_spur ? construction.current_inventory.final_spur[e.field] : ''
  })

  return item
}


function prepareDownloadParseLongitudinalInvFinalSpurDataFields(construction, item){
  let fields = getLongFinalSpurInventoryFields()

  fields.forEach(e => {
    item[e.field] = construction.current_inventory.final_spur ? construction.current_inventory.final_spur[e.field] : ''
  })

  return item
}


module.exports = router
