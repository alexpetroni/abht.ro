<template>
  <div>
    <h3>{{ title }}</h3>

    <form-navigator
    :form-state = "formState"
    @showFormStep="showFormStep"
    ></form-navigator>

    <editor-constr-indentify-data
    v-if = "currentView == 'editor-constr-indentify-data'"
    :construction = "construction"
    :edit-state = "editState"
    @submit = "onGeneralDataSubmit"
    ></editor-constr-indentify-data>

    <editor-sector
      v-if = "currentView == 'editor-sector'"
      :sector = "editedSector"
      :final-spur = "construction.cd.final_spur"
      :show-final-spur = "showFinalSpur"
      :edit-state = "editState"
      @submit="onSectorDataSubmit"
    ></editor-sector>

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
    @saveInventory = "onSaveNewContructionWithInventorySubmit"
    @deleteimage = "onDeleteImageSubmit"
    @appendImages = "onAppendImagesSubmit"
    ></editor-images>

  </div>
</template>

<script>

import { mapActions } from 'vuex'

import * as axios  from './../../../api'

import generalMixin from './../../../mixins/general'
import constructionMixin from './../../../mixins/construction'
import editorMixin from './../../../mixins/editor'
import inventoryMixin from './../../../mixins/inventory'
import formNavigatorMixin from './../../../mixins/formNavigator'

import { EditState } from './../../../models/EditState'

import FormNavigator from './../../form-navigator/FormNavigator.vue'

import EditorConstrIndentifyData from './EditorConstrIdentifyData.vue'
import EditorSector from './EditorSector.vue'
import EditorSectorInventory from './../../inventory/editors/EditorSectorInventory.vue'
import EditorImages from './../../inventory/editors/EditorImages.vue'
import EditorObservAndCauses from './../../inventory/editors/EditorObservAndCauses.vue'

export default{
  mixins: [
    generalMixin,
    constructionMixin,
    editorMixin,
    inventoryMixin,
    formNavigatorMixin
  ],
  props: [],

  data() {
    return {
      construction: this.getNewLongitudinalConstruction(),
      inventory: this.getNewLongitudinalInventory(),
      currentView: 'editor-constr-indentify-data',
      editState: EditState.NEW,
      editedSector: null,

      formState:{
        steps: [
          {name: 'Date identificare', label: 1, data:{ currentView: 'editor-constr-indentify-data'}, status: 'pristine' },
          this.getSectorFormStepData(),
          this.getInventoryFormStepData(),
          {name: 'Observatii', label: "8", data: {currentView: 'editor-observations-and-causes'}, status: 'pristine' },
          {name: 'Imagini', label: "9", data: {currentView: 'editor-images'}, status: 'pristine' },
        ],

        currentIndex: 0
      }
    }
  },

  methods: {
    ...mapActions(['invalidateConstructionsList']),
  },

  computed: {
    title(){
      let title = 'Adaugare canal de evacuare '

      title += " cu " + this.construction.cd.sectors.length ;

      if(this.construction.cd.sectors.length == 1){
        title += " sector"
      }else{
        title += " sectoare"
      }

      if(this.construction.has_final_spur){
        title += " cu "
      }else{
        title += " fara"
      }

      title += " pinten terminal"

      return title
    },

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
    EditorConstrIndentifyData,
    EditorSector,
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

    'construction.has_final_spur': function(val) {
      if(val){

      }
    },

    // sectors number can be changed only when adding a new construction and should be chained with sectors inventory
    'construction.cd.sectors': function(val) {
      let nrSect = this.construction.cd.sectors.length

      // manage inventory sectors
      if(nrSect < this.inventory.sectors.length){
        this.inventory.sectors.splice(nrSect)
      }else if(nrSect > this.inventory.sectors.length){
        let addSectors = []
        for(let i = this.inventory.sectors.length; i < nrSect; i++ ){
          addSectors.push(this.getNewSectorInventory(i+1))
        }

        this.inventory.sectors = this.inventory.sectors.concat(addSectors)
      }

      // manage formState
      let sectorsIndex = this.formState.steps.findIndex( e => e.group == 'sectors' )

      let inventoryIndex = this.formState.steps.findIndex( e => e.group == 'inventory' )
      let lastInventoryIndex = 0
      this.formState.steps.forEach( (e, index) => { if(e.group == 'inventory'){ lastInventoryIndex = index } })

      let sectorsElements = this.formState.steps.slice(sectorsIndex, inventoryIndex)
      let inventoryElements = this.formState.steps.slice(inventoryIndex, lastInventoryIndex+1)

      let formSectorsSteps = sectorsElements.length

      if(formSectorsSteps > nrSect){
        sectorsElements.splice(nrSect)
        inventoryElements.splice(nrSect)
      }else if(formSectorsSteps < nrSect){
        for(let i = formSectorsSteps; i < nrSect; i++){
          sectorsElements.push(this.getSectorFormStepData(i+1))
          inventoryElements.push(this.getInventoryFormStepData(i+1))
        }
      }

      let steps = this.formState.steps.slice(0,1)
      let lastTwoSteps = this.formState.steps.slice(-2)
      steps = steps.concat(sectorsElements, inventoryElements, lastTwoSteps)
      this.formState.steps = steps
    },

  },


}
</script>

<style>
</style>
