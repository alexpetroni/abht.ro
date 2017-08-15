const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = require('./db')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const mv = require('mv')
const sharp = require('sharp')
const multer = require('multer')

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

  let t1 =present()

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
      if(err) return next(err)

      let t2 =present()
      // console.log('perfomance   async.parallel ' + (t2-t1))


      if(!results[0].error && results[0].value != null){
        Object.assign(filters, results[0].value)
      }

      if(!results[1].error && results[1].value != null){
        Object.assign(filters, results[1].value)
      }


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


      res.send(id)
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



module.exports = router
