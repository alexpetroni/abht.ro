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
    :editState = "editState"
    @submit = "onGeneralDataSubmit"
    ></editor-constr-indentify-data>

    <editor-dam
    v-if="currentView == 'editor-dam'"
    :construction = "construction"
    :editState = "editState"
    @submit = "onDamDataSubmit"
    ></editor-dam>

    <editor-dam-inventory
    v-if = "currentView == 'editor-dam-inventory'"
    :construction = "construction"
    :inventory = "inventory"
    :editState = "editState"
    @submit = "onDamInventoryDataSubmit"
    ></editor-dam-inventory>

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
import EditorDam from './EditorDam.vue'
import EditorDamInventory from './../../inventory/editors/EditorDamInventory.vue'
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
      construction: this.getNewTransversalConstruction(),
      inventory: this.getNewTransversalInventory(),
      currentView: 'editor-constr-indentify-data',
      editState: EditState.NEW,

      formState:{
        steps: [
          {name: 'Date identificare', label: "1",  data:{currentView: 'editor-constr-indentify-data'}, status: 'pristine' },
          {name: 'Date baraj', label: "2", data: {currentView: 'editor-dam'}, status: 'pristine' },
          {name: 'Inventar', label: "3", data: {currentView: 'editor-dam-inventory'}, status: 'pristine' },
          {name: 'Observatii', label: "4", data: {currentView: 'editor-observations-and-causes'}, status: 'pristine' },
          {name: 'Imagini', label: "5", data: {currentView: 'editor-images'}, status: 'pristine' },
        ],

        currentIndex: 0
      },



    }
  },

  methods: {
    ...mapActions(['invalidateConstructionsList']),

    /*
    // When construction change status from 'with' to 'without' apron, delete evetually date stored in construction
    */
    clearDamApronData(){

      if(this.construction){
        let apron = this.getDamApron()
        Object.keys(apron).forEach( k => this.construction.cd.dam[k] = '')
        this.construction.cd.dam['mat_apron'] = ''
      }
    },

    /*
    // When construction change status from 'with' to 'without' final spur, delete evetually date stored in construction
    */
    clearDamFinalSpurData(){

      if(this.construction){
        let fs = this.getDamFinalSpur()
        Object.keys(fs).forEach( k => this.construction.cd.final_spur[k] = '')
      }
    },

    /*
    // When construction change status from 'with' to 'without' confuseur, delete evetually date stored in construction
    */
    clearDamConfuseurData(){

      if(this.construction){
        let cf = this.getDamConfuseur()
        Object.keys(cf).forEach( k => this.construction.cd.dam[k] = '')
      }
    },

  },

  computed: {
    title(){
      let title = 'Adăugare construcţie transversală '
      if(this.construction.cd.has_apron){
        title += " cu"
      }else{
        title += " fără"
      }

      title += " radier"

      return title
    }
  },

  components: {
    FormNavigator,
    EditorConstrIndentifyData,
    EditorDam,
    EditorDamInventory,
    EditorImages,
    EditorObservAndCauses
  },

  watch: {
    'construction.cd.has_apron': function(val){
      if(!val){
        // construction
        this.clearDamApronData()

        //inventory
        this.clearDamApronInventoryData()
      }else{
        this.markupStepsAsInvalid([1, 2])
      }
    },

    'construction.cd.has_final_spur': function(val){
      if(!val){
        // construction
        this.clearDamFinalSpurData()

        //inventory
        this.clearDamFinalSpurInventoryData()
      }else{
        this.markupStepsAsInvalid([1, 2])
      }
    },

    'construction.cd.has_confuseur': function(val){
      if(!val){
        // construction
        this.clearDamConfuseurData()
      }else{
        this.markupStepsAsInvalid([1, 2])
      }
    },

    'formState.currentIndex': function(val){
      let step = this.formState.steps[val]
      if(step && step.data){
        this.currentView = step.data.currentView
      }
    }
  },
}
</script>

<style>
</style>
