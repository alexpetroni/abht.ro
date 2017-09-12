const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const damInventorySchema = new Schema({
 // mainBody damages
 dec_left: { type: Number, default: 0},
 dec_right: { type: Number, default: 0},
 af_height: { type: Number, default: 0},
 af_percent: { type: Number, default: 0},
 h_crak_dev_nr: { type: Number, default: 0},
 h_crak_dev_l: { type: Number, default: 0},
 v_crak_dev_nr: { type: Number, default: 0},
 v_crak_dev_l: { type: Number, default: 0},
 h_crak_undev_nr: { type: Number, default: 0},
 h_crak_undev_l: { type: Number, default: 0},
 v_crak_undev_nr: { type: Number, default: 0},
 v_crak_undev_l: { type: Number, default: 0},
 detach_dev_percent: { type: Number, default: 0},
 detach_undev_left_percent: { type: Number, default: 0},
 detach_undev_right_percent: { type: Number, default: 0},
 erosion_height: { type: Number, default: 0},
 erosion_percent: { type: Number, default: 0},

 // apron damages
 apron_crack_nr: { type: Number, default: 0},
 apron_crack_percent: { type: Number, default: 0},
 apron_af_height: { type: Number, default: 0},
 apron_af_percent: { type: Number, default: 0},
 apron_detach_percent: { type: Number, default: 0},
 apron_teeth_detach_nr: { type: Number, default: 0},
 apron_detach_counter_dam_percent: { type: Number, default: 0},
 apron_erosion_height: { type: Number, default: 0},
 apron_erosion_percent: { type: Number, default: 0},

 // sidewall damages
 sidewall_left_horiz_craks_nr: { type: Number, default: 0},
 sidewall_left_horiz_length: { type: Number, default: 0},
 sidewall_left_vert_craks_nr: { type: Number, default: 0},
 sidewall_left_vert_length: { type: Number, default: 0},
 sidewall_left_displaced_percent: { type: Number, default: 0},
 sidewall_left_abrasion_deep: { type: Number, default: 0},
 sidewall_left_abrasion_percent: { type: Number, default: 0},


 sidewall_right_horiz_craks_nr: { type: Number, default: 0},
 sidewall_right_horiz_length: { type: Number, default: 0},
 sidewall_right_vert_craks_nr: { type: Number, default: 0},
 sidewall_right_vert_length: { type: Number, default: 0},
 sidewall_right_displaced_percent: { type: Number, default: 0},
 sidewall_right_abrasion_deep: { type: Number, default: 0},
 sidewall_right_abrasion_percent: { type: Number, default: 0},


 // disfunctionalities
 disf_colmat_deversor_percent: { type: Number, default: 0},
 disf_colmat_apron_su_percent: { type: Number, default: 0},
 disf_colmat_apron_srad_percent: { type: Number, default: 0},
 disf_hat: { type: Number, default: 0},
 disf_gal_type: String,
 disf_veget_amonte: { type: Number, default: 0},
 disf_veget_aval: { type: Number, default: 0},
 disf_section_dim_perecent: { type: Number, default: 0}
}, { _id: false })

const spurInventorySchema = new Schema({
  spur_nr: { type: Number },
  spur_horiz_craks_nr:  { type: Number, default: 0},
  spur_horiz_craks_lenght: { type: Number, default: 0},
  spur_vert_craks_nr: { type: Number, default: 0},
  spur_vert_craks_lenght: { type: Number, default: 0},
  spur_displaced_left: { type: Number, default: 0},
  spur_displaced_right: { type: Number, default: 0},
  spur_displaced_center: { type: Number, default: 0},
  spur_abrasion_percent: { type: Number, default: 0},
  spur_abrasion_deep: { type: Number, default: 0}
}, { _id: false })

const sectorInventorySchema = new Schema({
    sector_nr: { type: Number },
    // apron damages
    apron_craks_nr: { type: Number, default: 0},
    apron_damage_percent: { type: Number, default: 0},
    apron_displaced: { type: Number, default: 0},
    apron_abrasion_deep: { type: Number, default: 0},
    apron_abrasion_percent: { type: Number, default: 0},

    // sidewalls damages
    sidewall_left_horiz_craks_nr: { type: Number, default: 0},
    sidewall_left_horiz_length: { type: Number, default: 0},
    sidewall_left_vert_craks_nr: { type: Number, default: 0},
    sidewall_left_vert_length: { type: Number, default: 0},
    sidewall_left_displaced: { type: Number, default: 0},
    sidewall_left_abrasion_deep: { type: Number, default: 0},
    sidewall_left_abrasion_percent: { type: Number, default: 0},

    sidewall_right_horiz_craks_nr: { type: Number, default: 0},
    sidewall_right_horiz_length: { type: Number, default: 0},
    sidewall_right_vert_craks_nr: { type: Number, default: 0},
    sidewall_right_vert_length: { type: Number, default: 0},
    sidewall_right_displaced: { type: Number, default: 0},
    sidewall_right_abrasion_deep: { type: Number, default: 0},
    sidewall_right_abrasion_percent: { type: Number, default: 0},

    // spur damages
    spurs: [ spurInventorySchema ],

    disf_colmat_su_percent: { type: Number, default: 0},
    disf_colmat_srad_percent: { type: Number, default: 0},
    disf_section_dim_perecent: { type: Number, default: 0}
}, { _id: false })




const damFinalSpurInventorySchema = new Schema({
  final_spur_decastr_left: { type: Number, default: 0},
  final_spur_decastr_right: { type: Number, default: 0},
  final_spur_horiz_crack_nr: { type: Number, default: 0},
  final_spur_horiz_crack_length: { type: Number, default: 0},
  final_spur_vert_crack_nr: { type: Number, default: 0},
  final_spur_vert_crack_length: { type: Number, default: 0},
  final_spur_detach_left_percent: { type: Number, default: 0},
  final_spur_detach_right_percent: { type: Number, default: 0},
  final_spur_detach_center_percent: { type: Number, default: 0},
  final_spur_erosion_height: { type: Number, default: 0},
  final_spur_erosion_percent: { type: Number, default: 0}
}, { _id: false })

const sectorFinalSpurInventorySchema = new Schema({
  final_spur_decastr_left: { type: Number, default: 0},
  final_spur_decastr_right: { type: Number, default: 0},
  final_spur_afuieri_height: { type: Number, default: 0},
  final_spur_afuieri_percent: { type: Number, default: 0},

  final_spur_horiz_craks_nr:  { type: Number, default: 0},
  final_spur_horiz_craks_lenght: { type: Number, default: 0},
  final_spur_vert_craks_nr: { type: Number, default: 0},
  final_spur_vert_craks_lenght: { type: Number, default: 0},

  final_spur_displaced_left: { type: Number, default: 0},
  final_spur_displaced_right: { type: Number, default: 0},
  final_spur_displaced_center: { type: Number, default: 0},

  final_spur_abrasion_deep: { type: Number, default: 0},
  final_spur_abrasion_percent: { type: Number, default: 0}
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
  images: [ inventoryImageSchema ],

  author: { type: ObjectId, ref:"User" },
  last_edit_author: { type: ObjectId, ref:"User" }
  
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
