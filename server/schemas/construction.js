const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const inventory = require('./inventory.js')

const longInventorySchema = inventory.longInventorySchema
const transInventorySchema = inventory.transInventorySchema


const damSchema = new Schema({
  // construction itself
  ye: Number,
  h: Number,
  a: Number,
  b: Number,
  transversal_type: String,

  // apron
  lr: Number,
  br: Number,
  disip_type: String,
  hz: Number,
  apron_teeth_no: Number,

  // confuseur
  lc: Number,
  bc: Number,

  // construction materials
  mat_main_body: String,
  mat_wings: String,
  mat_apron: String,
  mat_counter_dam: String,
  mat_side_walls: String
}, { _id: false })

const sectorSchema = new Schema({
  sector_nr: Number,
  nr_of_stairs: Number,
  spurs: [{
    spur_nr: Number,
    mat_sect_spur: String,
    spur_sidewall_height: Number,
    spur_stair_height: Number,
    spur_length: Number
  }],
  sector_length: Number,
  sector_deep: Number,
  fruit_guard_wall: Number,
  apron_width: Number,

  mat_sect_apron: String,
  mat_sect_walls: String
}, { _id: false })


const longFinalSpurSchema = new Schema({
    mat_final_spur: String,
    spur_length: Number,
    sidewall_height: Number
}, { _id: false })


const transFinalSpurSchema = new Schema({
    mat_final_spur: String,
    spur_length: Number,
}, { _id: false })



const constrSchema = new Schema({
  type: { type: String, enum: ['long', 'trans'], index: true },
  wp_id: Number,
  gd:{ // general data
    cadastral_code: { type: ObjectId, ref:"Cadastral" },
    construction_code: String,
    basin_name: String,
    geolocation: {lat: {deg: Number, min:Number, sec:Number}, long: {deg: Number, min:Number, sec:Number}},
    _adminlocation: { type: ObjectId, ref:"Adminlocation" },
    construction_year: {type: Number, index: true},
    reparation_years: [ Number ],
    inventory_years: [ Number ],
    //
    owner: String,
    //
    protected_area: { type: Boolean, default: false },
    protected_area_name: String,
  },

  date_added: { type: Date, default: Date.now },
  date_last_modified: { type: Date, default: Date.now },

  author: { type: ObjectId, ref:"User" },
  last_edit_author: { type: ObjectId, ref:"User" }



}, { discriminatorKey: 'kind' })


constrSchema.methods.setAdminlocation = function(cb){
  let id = this.gd._adminlocation
  let locationModel = this.model('Adminlocation')

  const construction = this

   locationModel.findById( id ).populate('parent').exec( function(err, city){
    if(err) return cb(err)
    let adminlocation ={ city: '', county: '', county_slug: '', _id: undefined }

    if(city){
      adminlocation = {
        city: city.name,
        city_id: id,
        county: city.parent.name,
        county_slug: city.parent.slug,
        county_id: city.parent._id
      }
    }

    construction.set('gd.adminlocation' , adminlocation , {strict: false})
    cb(null, construction)
  })
}


constrSchema.methods.getCadastralCode = function(cb){
  let id = this.gd.cadastral_code
  let cadastralModel = this.model('Cadastral')

   cadastralModel.findById( id ).exec( function(err, cadastral){
    if(err) return cb(err)
    if(cadastral){
      cb(null, cadastral)
    }else{
      cb(null, { name: undefined, _id: undefined, parent: undefined, ancestors: [], breadcrumb: ''} )
    }
  })
}


constrSchema.statics.getFullConstruction = function(id, cb){

  return this.findById(id)
  .populate('gd.cadastral_code')
  .populate('author')
  .populate('last_edit_author')
  .populate('current_inventory.author')
  .populate('current_inventory.last_edit_author')
  .exec(function(err, constr){
    if(err) return cb(err)

    if(constr){
      constr.setAdminlocation(function(err, constrWithLocation){
        cb(err, constrWithLocation)
      })
    }else{
        cb(err, constr)
    }

  })
}




const transConstrSchema = new Schema({
  cd: {  // construction data
    has_final_spur: { type: Boolean, default: false },
    has_confuseur: { type: Boolean, default: false },
    has_apron: { type: Boolean, default: false, index: true },

    final_spur: transFinalSpurSchema,

    dam: damSchema,
  },

  current_inventory: transInventorySchema,

  inventories_archive: [ transInventorySchema ]

}, { _id: false })

const longConstrSchema = new Schema({
  cd: { // construction data
    has_final_spur: { type: Boolean, default: false },

    final_spur: longFinalSpurSchema,

    sectors:[ sectorSchema ],

    total_length: Number,
  },

  current_inventory: longInventorySchema,

  inventories_archive: [ longInventorySchema ]

}, { _id: false })

const Construction = mongoose.model("Construction", constrSchema)

exports.Construction = Construction

exports.LongitudinalConstruction = Construction.discriminator('long', longConstrSchema)

exports.TransversalConstruction = Construction.discriminator('trans', transConstrSchema)
