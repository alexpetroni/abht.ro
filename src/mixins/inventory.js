const config = require('./../../abht.config.js')


function getNewInventory(){
  var inventory = {
    year: '',
    ys: '',
    causes: '',
    comments: '',
    images: []
  }

  return inventory;
}


function getDamMainBodyDamages(){
  return {
    dec_left: '',
    dec_right: '',
    af_height: '',
    af_percent: '',
    h_crak_dev_nr: '',
    h_crak_dev_l: '',
    v_crak_dev_nr: '',
    v_crak_dev_l: '',
    h_crak_undev_nr: '',
    h_crak_undev_l: '',
    v_crak_undev_nr: '',
    v_crak_undev_l: '',
    detach_dev_percent: '',
    detach_undev_left_percent: '',
    detach_undev_right_percent: '',
    erosion_height: '',
    erosion_percent: ''
  }
}

function getDamApronDamages(){
  return{
    apron_crack_nr: '',
    apron_crack_percent: '',
    apron_af_height: '',
    apron_af_percent: '',
    apron_detach_percent: '',
    apron_teeth_detach_nr: '',
    apron_detach_counter_dam_percent: '',
    apron_erosion_height: '',
    apron_erosion_percent: ''
  }

}

function getDamSidewallsDamages(){
  return {
    sidewall_left_horiz_craks_nr: '',
    sidewall_left_horiz_length: '',
    sidewall_left_vert_craks_nr: '',
    sidewall_left_vert_length: '',
    sidewall_left_displaced_percent: '',
    sidewall_left_abrasion_deep: '',
    sidewall_left_abrasion_percent: '',


    sidewall_right_horiz_craks_nr: '',
    sidewall_right_horiz_length: '',
    sidewall_right_vert_craks_nr: '',
    sidewall_right_vert_length: '',
    sidewall_right_displaced_percent: '',
    sidewall_right_abrasion_deep: '',
    sidewall_right_abrasion_percent: ''
  }
}

function getDamFinalSpurDamages(){
  return {
    final_spur_decastr_left: '',
    final_spur_decastr_right: '',
    final_spur_horiz_crack_nr: '',
    final_spur_horiz_crack_length: '',
    final_spur_vert_crack_nr: '',
    final_spur_vert_crack_length: '',
    final_spur_detach_left_percent: '',
    final_spur_detach_right_percent: '',
    final_spur_detach_center_percent: '',
    final_spur_erosion_height: '',
    final_spur_erosion_percent: ''
  }
}

function getDamDisfunctionalities(){
  return {
    disf_colmat_deversor_percent: '',
    disf_colmat_apron_su_percent: '',
    disf_colmat_apron_srad_percent: '',
    disf_hat: '',
    disf_gal_type: '',
    disf_veget_amonte: '',
    disf_veget_aval: '',
    disf_section_dim_perecent: ''
  }
}


const trans_gal_types = [
  { name: "Fine", slug: 'f', description: "Fine" },
  { name: "Medii", slug: 'm', description: "Medii" },
  { name: "Grosiere", slug: 'g', description: "Grosiere" },
  { name: "N/A", slug: 'na', description: "N/A" }
]


const inventoryMixin = {
  methods: {

    // ====================== TRANSVERSAL ===========================

    transGranulometryTypes(){
      return trans_gal_types
    },

    getTransGranulometryOptionTypes(){
      return [{ name: "Selecteaza", slug: '', description: "" }, ...trans_gal_types ]
    },

    getTransGranulometryTypeBySlug(slug, key){
      let el = trans_gal_types.find(e =>
        e.slug == slug
      )

      if(el){
        if(key) return el[key]
        return el
      }

      return undefined
    },

    getNewTransversalInventory(){
      var inventory = getNewInventory()

      inventory.dam = Object.assign({},
         getDamMainBodyDamages(),
         getDamApronDamages(),
         getDamSidewallsDamages(),
         getDamDisfunctionalities() )

         inventory.final_spur = getDamFinalSpurDamages()

         inventory.causes = {
           mainBody: { decastr: [], af:[], cracks:[], detach:[], erosion:[] },
           apron: { af:[], cracks:[], detach:[], erosion:[] },
           sidewalls: { cracks:[], detach:[], erosion:[] },
           spurs: { decastr: [], cracks:[], detach:[], erosion:[] },
           disfunctionalities: []
         }

      return inventory
    },

    /*
    // When construction change status from 'with' to 'without' apron, delete evetually data stored in inventory
    */
    clearDamApronInventoryData(){
      if(this.inventory){
        let apron = getDamApronDamages()
        Object.keys(apron).forEach( k => this.inventory[k] = '')
      }
    },

    /*
    // When construction change status from 'with' to 'without' final spur, delete evetually data stored in inventory
    */
    clearDamFinalSpurInventoryData(){
      if(this.inventory){
        let fs = getDamFinalSpurDamages()
        Object.keys(fs).forEach( k => this.inventory[k] = '')
      }
    },


    // ====================== LONGITUDINAL ===========================

    getNewLongitudinalInventory(){
      var inventory = getNewInventory()

      inventory.sectors = [this.getNewSectorInventory()]

      inventory.final_spur = this.getSectorsFinalSpurDamages()

      inventory.causes = {
        apron: { af: [], cracks: [], detach: [], erosion: [] },
        sidewalls: { cracks: [], detach: [], erosion: [] },
        spurs: { decastr: [], cracks: [], detach: [], erosion: [] },
        disfunctionalities: []
      }

      return inventory
    },

    getNewSectorInventory(nr){
      let sectorInventory = Object.assign({sector_nr:  nr ? nr : 1 },
        this.getSectorApronDamages(),
        this.getSectorSidewallsDamages(),
        this.getSectorDisfunctionalities(),
      )

      sectorInventory.spurs = [this.getSectorSpurDamages()]

      return sectorInventory
    },

    getSectorApronDamages(){
      return {
        apron_craks_nr: '',
        apron_damage_percent: '',
        apron_displaced: '',
        apron_abrasion_deep: '',
        apron_abrasion_percent: ''
      }
    },

    getSectorSidewallsDamages(){
      return {
        sidewall_left_horiz_craks_nr: '',
        sidewall_left_horiz_length: '',
        sidewall_left_vert_craks_nr: '',
        sidewall_left_vert_length: '',
        sidewall_left_displaced: '',
        sidewall_left_abrasion_deep: '',
        sidewall_left_abrasion_percent: '',

        sidewall_right_horiz_craks_nr: '',
        sidewall_right_horiz_length: '',
        sidewall_right_vert_craks_nr: '',
        sidewall_right_vert_length: '',
        sidewall_right_displaced: '',
        sidewall_right_abrasion_deep: '',
        sidewall_right_abrasion_percent: ''
      }
    },


    getSectorSpurDamages(nr){
      return {
        spur_nr: nr ? nr : 1,
        spur_horiz_craks_nr:  '',
        spur_horiz_craks_lenght: '',
        spur_vert_craks_nr: '',
        spur_vert_craks_lenght: '',
        spur_displaced_left: '',
        spur_displaced_right: '',
        spur_displaced_center: '',
        spur_abrasion_percent: '',
        spur_abrasion_deep: ''
      }
    },

    getSectorDisfunctionalities(){
      return {
        disf_colmat_su_percent: '',
        disf_colmat_srad_percent: '',
        disf_section_dim_perecent: ''
      }
    },

    getSectorsFinalSpurDamages(){
      return {
        final_spur_decastr_left: '',
        final_spur_decastr_right: '',
        final_spur_afuieri_height: '',
        final_spur_afuieri_percent: '',

        final_spur_horiz_craks_nr:  '',
        final_spur_horiz_craks_lenght: '',
        final_spur_vert_craks_nr: '',
        final_spur_vert_craks_lenght: '',

        final_spur_displaced_left: '',
        final_spur_displaced_right: '',
        final_spur_displaced_center: '',

        final_spur_abrasion_deep: '',
        final_spur_abrasion_percent: ''
      }
    },



    /*
    // When longitudinal construction change status from 'with' to 'without' final spur, delete evetually data stored in construction inventory
    */
    clearSectorFinalSpurInventoryData(){
      if(this.construction){
        let sfs = this.getSectorsFinalSpurDamages()
        let lastSectorIndex = this.inventory.sectors.length - 1

        let lastSector = this.inventory.sectors[lastSectorIndex]

        //Object.keys(sfs).forEach( k => this.construction.dam[k] = '')
      }
    },


    getInventoryFormStepData(nr, status){
      if(nr == undefined ){
        nr = 1;
      }
      if(status == undefined ){
        status = 'pristine'
      }
      return {
        group: 'inventory',
        groupName: "Inventariere sectoare",
        label: nr,
        data: { currentView: 'editor-sector-inventory', inventory_nr: nr },
        status: status}
    },

    getLastSectorInventoryFormStepIndex(){
      let lastIndex = -1
      if(this.formState && this.formState.steps){
        for(let i = 0; i < this.formState.steps.length; i++){
          if(this.formState.steps[i].data.currentView == 'editor-sector-inventory'){
            lastIndex = i
          }
        }
      }
      return lastIndex
    },

    matchInventoryToSector(inventory, sector){
      let sectorSpursNr = sector.spurs.length
      let inventorySpursNr = inventory.spurs.length

      if(sectorSpursNr < inventorySpursNr){
        inventory.spurs.splice(sectorSpursNr)
      }

      if(sectorSpursNr > inventorySpursNr){
        let extraSpurs = []
        for(let i = inventorySpursNr; i < sectorSpursNr; i++){
          extraSpurs.push(this.getSectorSpurDamages(i+1))
        }
        inventory.spurs = inventory.spurs.concat(extraSpurs)
      }

      return inventory
    }

  }

}

export default inventoryMixin
