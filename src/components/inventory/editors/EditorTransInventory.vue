<template>
  <div v-if="inventory">
    <form-navigator
    :form-state = "formState"
    @showFormStep="showFormStep"
    ></form-navigator>

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
    :editState = "editState"
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
import * as axios from './../../../api'

import { mapActions } from 'vuex'

import generalMixin from './../../../mixins/general'
import constructionMixin from './../../../mixins/construction'
import inventoryMixin from './../../../mixins/inventory'
import editorMixin from './../../../mixins/editor'
import formNavigatorMixin from './../../../mixins/formNavigator'


import { EditState } from './../../../models/EditState'

import FormNavigator from './../../form-navigator/FormNavigator.vue'

import EditorDamInventory from './EditorDamInventory.vue'
import EditorImages from './../../inventory/editors/EditorImages.vue'
import EditorObservAndCauses from './../../inventory/editors/EditorObservAndCauses.vue'

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
      currentView: 'editor-dam-inventory',

      formState:{
        steps: [
          {name: 'Inventar', label: "3", data: {currentView: 'editor-dam-inventory'}, status: 'pristine' },
          {name: 'Observatii', label: "4", data: {currentView: 'editor-observations-and-causes'}, status: 'pristine' },
          {name: 'Imagini', label: "5", data: {currentView: 'editor-images'}, status: 'pristine' },
        ],

        currentIndex: 0
      },
    }
  },

  methods: {
    ...mapActions(['invalidateConstructionsList', 'setupErrorMsg' ]),
  },

  computed: {

  },

  components: {
    EditorDamInventory,
    FormNavigator,
    EditorImages,
    EditorObservAndCauses
  },

  watch: {
    'formState.currentIndex': function(val){
      let step = this.formState.steps[val]
      if(step && step.data){
        this.currentView = step.data.currentView
      }
    }
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
      let inventory = this.getNewTransversalInventory()
      this.inventory = inventory
    }
  },

}
</script>

<style>
</style>
