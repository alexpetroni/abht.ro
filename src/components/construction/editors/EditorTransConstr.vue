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

    <editor-dam
    v-if="currentView == 'editor-dam'"
    :construction = "construction"
    :editState = "editState"
    @submit = "onDamDataSubmit"
    ></editor-dam>
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
import EditorDam from './EditorDam.vue'

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

      formState:{
        steps: [
          { name: 'Date identificare', label: "1",  data:{ currentView: 'editor-constr-indentify-data'}, status: 'valid' },
          { name: 'Date baraj', label: "2", data: {currentView: 'editor-dam'}, status: 'valid' }
        ],

        currentIndex: 0
      },

      constrObserver:null,
      damObserver:null
    }
  },

  methods: {
    ...mapActions(['invalidateConstructionsList']),
  },

  computed: {

  },

  components: {
    FormNavigator,
    EditorConstrIndentifyData,
    EditorDam,
  },

  watch: {
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
