<template>
  <div v-if="inventory">
    <form-navigator
    :form-state = "formState"
    @showFormStep="showFormStep"
    ></form-navigator>

    <editor-sector-inventory
    v-if = "currentView == 'editor-sector-inventory'"
    :sector = "editedSector"
    :sector-inventory = "editedSectorInventory"
    :final-spur-inventory = "inventory.final_spur"
    :show-final-spur = "showFinalSpur"
    :year = "inventory.year"
    :edit-state = "editState"
    @submit="onSectorInventoryDataSubmit"
    ></editor-sector-inventory>

    <editor-observ-and-causes
    v-if = "currentView == 'editor-observations-and-causes'"
    :construction = "construction"
    :inventory = "inventory"
    :edit-state = "editState"
    @submit = "onObsAndCauseSubmit"
    ></editor-observ-and-causes>

    <editor-images
    v-if = "currentView == 'editor-images'"
    :edit-state = "editState"
    :inventory = "inventory"
    @saveInventory = "onSaveNewInventorySubmit"
    @deleteImage = "onDeleteImageSubmit"
    @appendImages = "onAppendImagesSubmit"
    ></editor-images>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import * as axios from './../../../api'

import generalMixin  from './../../../mixins/general'
import constructionMixin from './../../../mixins/construction'
import inventoryMixin from './../../../mixins/inventory'
import editorMixin from './../../../mixins/editor'
import formNavigatorMixin from './../../../mixins/formNavigator'

import FormNavigator from './../../form-navigator/FormNavigator.vue'

import EditorSectorInventory from './EditorSectorInventory.vue'
import EditorImages from './../../inventory/editors/EditorImages.vue'
import EditorObservAndCauses from './../../inventory/editors/EditorObservAndCauses.vue'


import { EditState } from './../../../models/EditState'

export default{
  mixins: [
    generalMixin,
    constructionMixin,
    inventoryMixin,
    editorMixin,
    formNavigatorMixin
   ],
  props: [ 'construction', 'editState', 'year'],

  data() {
    return {
      inventory: null,
      editedSector: null,
      currentView: 'editor-sector-inventory',

      formState:{
        steps: [
        ],

        currentIndex: 0
      }
    }
  },

  methods: {
    ...mapActions([ 'invalidateConstructionsList', 'setupErrorMsg' ]),

  },


  computed: {

    showFinalSpur(){
      return this.construction.cd.has_final_spur && this.isLastSector(this.editedSector, this.construction.cd.sectors)
    },

    editedSectorInventory(){
      let editedSectorNr = this.editedSector.sector_nr
      if(!editedSectorNr) return undefined
      let inventory = this.inventory.sectors.find( e => e.sector_nr == editedSectorNr )
      if(inventory){
        inventory = this.matchInventoryToSector(inventory, this.editedSector)
      }
      return inventory
    }
  },

  components: {
    FormNavigator,
    EditorSectorInventory,
    EditorImages,
    EditorObservAndCauses
  },

  watch: {
    'formState.currentIndex': function(val){
      let step = this.formState.steps[val]
      if(step && step.data){
        // because the editedInventory mirror editedSector the setup will be editedSector
        let nr = step.data.sector_nr || step.data.inventory_nr

        if(nr != undefined){
          this.editedSector = this.getSectorByNr(nr)
        }

        this.currentView = step.data.currentView
      }
    },
  },

  created(){
    if(this.editState == EditState.EDIT){ // edit existing inventory
      for(let inv of this.construction.inventories){
        if( inv.year == this.year ){
          this.inventory = inv
          break
        }
      }

      this.formState.steps.forEach( s => s.status = 'valid')

      if(!this.inventory){
        this.setupErrorMsg('Nu exista inventar pentru anul '+ this.year)
        this.$router.push('/error')
      }
    }else{ // create new inventory
      let inventory = this.getNewLongitudinalInventory()
      inventory.constructionId = this.construction._id

      inventory.sectors = []
      for(let i = 0; i < this.construction.cd.sectors.length; i++){
        inventory.sectors.push(this.getNewSectorInventory((i+1)))
      }

      this.inventory = inventory
    }

    this.editedSector = this.construction.cd.sectors[0]

    // update form state steps
    let steps = []
    let status = this.editState == EditState.EDIT ? 'valid' : 'pristine'



    for(let i = 0; i < this.construction.cd.sectors.length; i++){
      steps.push(this.getInventoryFormStepData(i+1, status))
    }

    steps.push( {name: 'Observatii', label: "4", data: {currentView: 'editor-observations-and-causes'}, status: status } )
    steps.push( {name: 'Imagini', label: "5", data: {currentView: 'editor-images'}, status: status } )

    this.formState.steps = steps
  },


}
</script>

<style>
</style>
