<template>
  <div>
    <div v-if = "construction && inventory">

      <editor-menu :construction="construction" :inventory="inventory"></editor-menu>

      <component :is="constructionPresentationType" :construction="construction" :inventory="inventory"></component>
    </div>

    <div v-if = "noResult">
      <h4>Nu s-a găsit nici o construcție cu acest id.</h4>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import * as axios from './../../api'

import constructionMixin from './../../mixins/construction'

import EditorMenu from './editors/EditorMenu.vue'

import LongConstr from './LongConstr.vue'
import TransConstr from './TransConstr.vue'


export default{
  mixins: [ constructionMixin ],
  props: ['id', 'year'],

  data() {
    return {
      construction: null,
      inventory:null,

      noResult: false
    }
  },

  methods: {
    ...mapActions(['setupErrorMsg']),

    getConstructionInventory(year){
      if(this.construction.current_inventory.year == year){
        return this.construction.current_inventory
      }
      
      return this.construction.inventories_archive.find( inv => inv.year == year )
    }
  },

  computed: {
    constructionPresentationType(){
      if(this.isLongitudinal){
        return 'long-constr'
      }else{
        return 'trans-constr'
      }
    },
  },

  components: {
    EditorMenu,
    LongConstr,
    TransConstr,
  },

  watch: {
    'year': function(val){
      this.inventory = this.getConstructionInventory(val)
      console.log('inventory changed')
    },
  },

  created(){
    if(this.id){
      const req = { url: '/constructions/' + this.id }
      axios._get( req )
    .then( res => {
      if(!res.data){
        this.noResult = true
      }else{
        this.construction = res.data
        this.inventory = res.data.current_inventory

        console.log('Loaded construction ', this.construction)
        console.log('Loaded inventory ', this.inventory)
      }
    })
    .catch(err => console.log(err))
    }
  }

}
</script>

<style>
</style>
