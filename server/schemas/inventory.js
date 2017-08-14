const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const damInventorySchema = new Schema({
 // mainBody damages
 dec_left: Number,
 dec_right: Number,
 af_height: Number,
 af_percent: Number,
 h_crak_dev_nr: Number,
 h_crak_dev_l: Number,
 v_crak_dev_nr: Number,
 v_crak_dev_l: Number,
 h_crak_undev_nr: Number,
 h_crak_undev_l: Number,
 v_crak_undev_nr: Number,
 v_crak_undev_l: Number,
 detach_dev_percent: Number,
 detach_undev_left_percent: Number,
 detach_undev_right_percent: Number,
 erosion_height: Number,
 erosion_percent: Number,

 // apron damages
 apron_crack_nr: Number,
 apron_crack_percent: Number,
 apron_af_height: Number,
 apron_af_percent: Number,
 apron_detach_percent: Number,
 apron_teeth_detach_nr: Number,
 apron_detach_counter_dam_percent: Number,
 apron_erosion_height: Number,
 apron_erosion_percent: Number,

 // sidewall damages
 sidewall_left_horiz_craks_nr: Number,
 sidewall_left_horiz_length: Number,
 sidewall_left_vert_craks_nr: Number,
 sidewall_left_vert_length: Number,
 sidewall_left_displaced_percent: Number,
 sidewall_left_abrasion_deep: Number,
 sidewall_left_abrasion_percent: Number,


 sidewall_right_horiz_craks_nr: Number,
 sidewall_right_horiz_length: Number,
 sidewall_right_vert_craks_nr: Number,
 sidewall_right_vert_length: Number,
 sidewall_right_displaced_percent: Number,
 sidewall_right_abrasion_deep: Number,
 sidewall_right_abrasion_percent: Number,


 // disfunctionalities
 disf_colmat_deversor_percent: Number,
 disf_colmat_apron_su_percent: Number,
 disf_colmat_apron_srad_percent: Number,
 disf_hat: Number,
 disf_gal_type: String,
 disf_veget_amonte: Number,
 disf_veget_aval: Number,
 disf_section_dim_perecent: Number
}, { _id: false })

const spurInventorySchema = new Schema({
  spur_nr: Number,
  spur_horiz_craks_nr:  Number,
  spur_horiz_craks_lenght: Number,
  spur_vert_craks_nr: Number,
  spur_vert_craks_lenght: Number,
  spur_displaced_left: Number,
  spur_displaced_right: Number,
  spur_displaced_center: Number,
  spur_abrasion_percent: Number,
  spur_abrasion_deep: Number
}, { _id: false })

const sectorInventorySchema = new Schema({
    sector_nr: Number,
    // apron damages
    apron_craks_nr: Number,
    apron_damage_percent: Number,
    apron_displaced: Number,
    apron_abrasion_deep: Number,
    apron_abrasion_percent: Number,

    // sidewalls damages
    sidewall_left_horiz_craks_nr: Number,
    sidewall_left_horiz_length: Number,
    sidewall_left_vert_craks_nr: Number,
    sidewall_left_vert_length: Number,
    sidewall_left_displaced: Number,
    sidewall_left_abrasion_deep: Number,
    sidewall_left_abrasion_percent: Number,

    sidewall_right_horiz_craks_nr: Number,
    sidewall_right_horiz_length: Number,
    sidewall_right_vert_craks_nr: Number,
    sidewall_right_vert_length: Number,
    sidewall_right_displaced: Number,
    sidewall_right_abrasion_deep: Number,
    sidewall_right_abrasion_percent: Number,

    // spur damages
    spurs: [ spurInventorySchema ],

    disf_colmat_su_percent: Number,
    disf_colmat_srad_percent: Number,
    disf_section_dim_perecent: Number
}, { _id: false })




const damFinalSpurInventorySchema = new Schema({
  final_spur_decastr_left: Number,
  final_spur_decastr_right: Number,
  final_spur_horiz_crack_nr: Number,
  final_spur_horiz_crack_length: Number,
  final_spur_vert_crack_nr: Number,
  final_spur_vert_crack_length: Number,
  final_spur_detach_left_percent: Number,
  final_spur_detach_right_percent: Number,
  final_spur_detach_center_percent: Number,
  final_spur_erosion_height: Number,
  final_spur_erosion_percent: Number
}, { _id: false })

const sectorFinalSpurInventorySchema = new Schema({
  final_spur_decastr_left: Number,
  final_spur_decastr_right: Number,
  final_spur_afuieri_height: Number,
  final_spur_afuieri_percent: Number,

  final_spur_horiz_craks_nr:  Number,
  final_spur_horiz_craks_lenght: Number,
  final_spur_vert_craks_nr: Number,
  final_spur_vert_craks_lenght: Number,

  final_spur_displaced_left: Number,
  final_spur_displaced_right: Number,
  final_spur_displaced_center: Number,

  final_spur_abrasion_deep: Number,
  final_spur_abrasion_percent: Number
}, { _id: false })

const damCausesSchema = new Schema({
  mainBody: { decastr: [ String ], af:[ String ], cracks:[ String ], detach:[ String ], erosion:[ String ] },
  apron: { af:[ String ], cracks:[ String ], detach:[ String ], erosion:[ String ] },
  sidewalls: { cracks:[ String ], detach:[ String ], erosion:[ String ] },
  spurs: { decastr: [ String ], cracks:[ String ], detach:[ String ], erosion:[ String ] },
  disfunctionalities: [ String ]
}, { _id: false })

const sectorCausesSchema = new Schema({
  apron: { af:[ String ], cracks:[ String ], detach:[ String ], erosion:[ String ] },
  sidewalls: { cracks:[ String ], detach:[ String ], erosion:[ String ] },
  spurs: { decastr: [ String ], cracks:[ String ], detach:[ String ], erosion:[ String ] },
  disfunctionalities: [ String ]
}, { _id: false })


const inventoryImageSchema = new Schema({
  relPath: String,
  original: String,
  thumb: String,
  small: String,
  medium: String,
  large: String
} )

const inventorySchema = new Schema({

  year: {type: Number, index: true},
  ys: {type: Number, index: true },

  date_added: { type: Date, default: Date.now },
  date_last_modified: { type: Date, default: Date.now },

  comments: String,
  images: [ inventoryImageSchema ]
}, { discriminatorKey: 'inventoryKind' })

const longInventorySchema = new Schema({
    sectors: [ sectorInventorySchema ],
    final_spur: sectorFinalSpurInventorySchema,
    causes: sectorCausesSchema,
}, { _id: false })

const transInventorySchema = new Schema({
    dam: damInventorySchema,
    final_spur: damFinalSpurInventorySchema,
    causes: damCausesSchema,
}, { _id: false })

const Inventory = mongoose.model("Inventory", inventorySchema)

exports.Inventory = Inventory

exports.LongInventory = Inventory.discriminator("LongInventory", longInventorySchema)
exports.TransInventory = Inventory.discriminator("TransInventory", transInventorySchema)

exports.longInventorySchema = longInventorySchema
exports.transInventorySchema = transInventorySchema
