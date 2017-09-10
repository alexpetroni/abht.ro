const mongoose = require('mongoose')
const async = require('async')
const db = require('./../server/db')
const fs = require('fs')
const path = require('path')

const ObjectId = mongoose.Types.ObjectId

let sourceFile = process.argv[2]

let filePath = path.join(__dirname, sourceFile)


function getAdminlocationId(county, city, cb){
  if(city && typeof city == "string"){
    city = city.trim()
  }
  //console.log('county ' , county, ' city ', city)

  if(county){
    db.Adminlocation.findOne( {name: county, parent: null}, function(err, countyRes){

      if(!countyRes){
        //console.log("Fara judet !!! ", county)
        return cb(null, null)
      }
      let countyId = countyRes._id

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
    //console.log('No county')
    cb(null, null)
  }
}


function getCadastralCodeId(codeArr, callback){
  // first element in array is the level_0 _id, the rest are the names of the cadastrals taxonomy
  if(Array.isArray(codeArr)){
  //  console.log('inside getCadastralCodeId codeArr' , codeArr)
    // get level_0
    db.Cadastral.findOne({ slug: codeArr[0], parent: null }, function(err, level_0){
      if(err || level_0 == null) return callback(err) // level_0 should not be added after installation, they are fixed

      // remove all empty elements in codeArr
      let emptyElIndex = codeArr.findIndex(e => { return e === null || ( typeof e == 'string' && e.trim() == '')} )
      if(emptyElIndex != -1 ){
        codeArr.splice(emptyElIndex)
      }

      let codeNamesArr = codeArr.slice(1)
      // remove spaces and convert to lowercases
      codeNamesArr = codeNamesArr.map(e => {
          e +="" // convert to string
          return e = e.trim().toLowerCase()
      })

      //console.log(' getCadastralCodeId codeNamesArr ', codeNamesArr)

      if(codeArr.length == 1){ // if only one level deep, stop here
        return callback(null, level_0._id)
      }


      let ancestors = level_0.ancestors // []
      let breadcrumb = level_0.breadcrumb
      let parentId = level_0._id

      // console.log(parentId)

      async.reduce(codeNamesArr, parentId, function(parentId, name, cb) {

        db.Cadastral.findOne({name: name, parent: parentId}, function(err, cad){
          if(err) return  callback(err)

          if(cad){
            //console.log('cadastral ' +name + ' exists')
            parentId = cad._id
            ancestors = cad.ancestors
            breadcrumb = cad.breadcrumb

            cb(null, cad._id)
          }else{
              //console.log('create cadastral ' + name )
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
        //console.log(' getCadastralCodeId ', result)
        callback(null, result)
      }
    )

  })


}else{
  callback(new Error("Array expected for cadastral codes"), null)
}
}


function recordConstruction(arr, currentIndex){
  let data = arr[currentIndex]

  let adminLocation = data.gd._adminlocation
  let cadastralCodeArr = data.gd.cadastral_code.split('-')

//  console.log('adminLocation', adminLocation)
//  console.log('cadastralCodeArr', cadastralCodeArr)

  delete data.gd._adminlocation
  delete data.gd.cadastral_code

  data.kind = data.type

  let inventory = data.inventories[0]
  inventory.inventoryKind = data.type == 'long' ? 'LongInventory' : 'TransInventory'

  delete data.inventories

  data.current_inventory = inventory


  let cons = db.Construction.create(data, function (err, c) {
    if (err){
      return console.log( err )
    }



    async.parallel([
      async.reflect(function(callback){
        getAdminlocationId(adminLocation[0], adminLocation[1], callback)
      }),

      async.reflect(function(callback){
        getCadastralCodeId(cadastralCodeArr, callback)
      }),
      //
      // async.reflect(function(callback){
      //   db.Inventory.create(inventory, callback)
      // }),
    ],
    function(err, results){
      console.log('admin location ', results[0].value, ' cadastral code ', results[1].value)
      if(!results[0].error && results[0].value){
        c.gd._adminlocation = ObjectId(results[0].value)
      }

      if(!results[1].error && results[1].value){
        c.gd.cadastral_code = ObjectId(results[1].value)
      }

      // if( !results[2].error && results[2].value){
      //   c.current_inventory = ObjectId(results[2].value._id)
      // }

      c.save(function(err, newConstruction){
        if(err) return console.log(err)
        if(arr.length > currentIndex + 1){
          recordConstruction(arr, ++currentIndex)
        }else{
          console.log("introdus " + currentIndex + "lucrari")
        }
      })

    })
  })
}

fs.readFile(filePath, {encoding: 'utf-8'}, function(err, content){
  if(err) return console.log(err)

  let parsCont = JSON.parse(content)

  let currentIndex = 0;

  recordConstruction(parsCont, 0)
})
