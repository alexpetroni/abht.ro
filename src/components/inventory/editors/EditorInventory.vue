<template>
  <div>
  <div v-if="construction">

    <div class="text-right">
      <button @click.prevent="deleteCurrentInventory" href="#" class="btn btn-primary" v-if = "construction.inventories_archive.length > 0">Sterge inventar</button>

      <router-link
      :to="{
        name: 'construction',
        params:{ id: construction._id }
      }"
      ><button class="btn btn-primary">Vizualizare constructie</button></router-link>


    </div>


    <h3>{{ title }}</h3>
    <component
    :is = "inventoryEditType"
    :editState = "editState"
    :construction = "construction"
    :year = "year"
    ></component>
  </div>

</div>
</template>

<script>
import * as axios from './../../../api'

import { mapActions } from 'vuex'



import { EditState } from './../../../models/EditState'

import constructionMixin from './../../../mixins/construction'
import inventoryMixin from './../../../mixins/inventory'

import EditorLongInventory from './EditorLongInventory.vue'
import EditorTransInventory from './EditorTransInventory.vue'

import ErrorComponent from './../../page/ErrorComponent.vue'

export default{
  mixins: [ constructionMixin, inventoryMixin ],
  props: {
    'id': [Number, String],

    'year':{
      type: [ Number, String ],
      default: ''
    },
  } ,

  data() {
    return {
      construction: null,
      editState: null,

    }
  },

  methods: {
    ...mapActions(['invalidateConstructionsList', 'setupErrorMsg']),

    deleteCurrentInventory(){

      if(!confirm("Doresti sa stergi inventarul pentru anul "+this.year+ "?")) return

      let url = 'constructions/'+this.construction._id+'/inventory/' + this.year
      let req = { url: url }

      axios._delete(req)
      .then( res => {
        console.log(res)
        this.invalidateConstructionsList()
        this.$router.push({name: 'construction', params: {id: res.data._id}})
      })
      .catch( error => console.log(error) )
    },
  },

  computed: {
    inventoryEditType(){
      if(this.isLongitudinal){
        return 'editor-long-inventory'
      }else{
        return 'editor-trans-inventory'
      }
    },

    title(){
      let title = '';
      if(this.editState == EditState.EDIT){
        title += 'Editare inventar '+ this.year
      }else{
        title += 'Adăugare inventar '
      }

      if(this.isLongitudinal){
        title += ' fișă canal de evacuare'
      }else{
        title += ' fișă lucrare transversală'
      }
      title += ' ' + this.construction.gd.basin_name
      title += ' ' + this.getConstructionCadastralCode()
      title += '#' + this.construction.gd.construction_code
      return title
    }
  },

  components: {
    EditorLongInventory,
    EditorTransInventory
  },

  watch: {

  },

  created(){
    if(this.id){
      const req = { url: '/constructions/' + this.id }
      axios._get( req )
    .then( res => {
      this.construction = res.data
      if(this.year){
        this.editState = EditState.EDIT
      }else{
        this.editState = EditState.NEW
      }

    })
    .catch(err => console.log(err))
    }
  }




}
</script>

<style>
</style>
