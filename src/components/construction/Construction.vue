<template>
  <div>
    <div v-if = "construction && inventory">

      <component :is="constructionPresentationType" :construction="construction" :inventory="inventory"></component>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import * as axios from './../../api'

import constructionMixin from './../../mixins/construction'

//import EditorMenu from './editors/EditorMenu.vue'

import LongConstr from './LongConstr.vue'
import TransConstr from './TransConstr.vue'


export default{
  mixins: [ constructionMixin ],
  props: ['id', 'year'],

  data() {
    return {
      construction: null,
      inventory:null,
    }
  },

  methods: {
    ...mapActions(['setupErrorMsg']),

    getConstructionInventory(year){
      return this.construction.inventories.find( inv => inv.year == year )
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
  //  EditorMenu,
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
      this.construction = res.data
      this.inventory = res.data.current_inventory

      console.log('Loaded construction ', this.construction)
      console.log('Loaded inventory ', this.inventory)
    })
    .catch(err => console.log(err))
    }
  }

}
</script>

<style>
</style>
