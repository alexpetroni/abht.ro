<template>
  <div>
    <form-navigator
    :form-state = "formState"
    @showFormStep="showFormStep"
    ></form-navigator>

    <editor-constr-indentify-data
    v-if = "currentView == 'editor-constr-indentify-data'"
    :construction = "construction"
    :editState = "editState"
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
  </div>
</template>

<script>

import * as axios  from './../../../api'

import { mapActions } from 'vuex'


import generalMixin  from './../../../mixins/general'
import constructionMixin from './../../../mixins/construction'
import editorMixin from './../../../mixins/editor'
import formNavigatorMixin from './../../../mixins/formNavigator'

import { EditState } from './../../../models/EditState'

import FormNavigator from './../../form-navigator/FormNavigator.vue'
import EditorConstrIndentifyData from './EditorConstrIdentifyData.vue'
import EditorSector from './EditorSector.vue'

export default{
  mixins: [
    constructionMixin,
    editorMixin,
    generalMixin,
    formNavigatorMixin
    ],
  props: [ 'construction' ],

  data() {
    return {
      currentView: 'editor-constr-indentify-data',
      editState: EditState.EDIT,
      editedSector: null,

      formState:{
        steps: [
          {name: 'Date identificare', label: "1",  data:{currentView: 'editor-constr-indentify-data'}, status: 'valid' }
        ],

        currentIndex: 0
      },

      constrObserver:null,
      sectorObserver:null,
    }
  },

  methods: {
    ...mapActions(['invalidateConstructionsList']),
  },

  computed: {
    showFinalSpur(){
      return this.construction.cd.has_final_spur && this.isLastSector(this.editedSector, this.construction.cd.sectors)
    },
  },

  components: {
    FormNavigator,
    EditorConstrIndentifyData,
    EditorSector
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

  created: function(){
    // update form state steps
    let steps = []
    for(let i = 0; i < this.construction.cd.sectors.length; i++){
      steps.push(this.getSectorFormStepData(i+1, 'valid'))
    }

    this.formState.steps = this.formState.steps.concat(steps)
  },

}
</script>

<style>
</style>
