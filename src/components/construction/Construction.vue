<template>
  <div>
    <div v-if = "construction && inventory">
    <div class="text-right">
      <editor-menu
      v-if="isAuthenticated"
      :construction="construction"
      :inventory="inventory"
      @deleteConstruction="onDeleteConstruction"
      >
      </editor-menu>
    </div>

      <component :is="constructionPresentationType" :construction="construction" :inventory="inventory"></component>
    </div>

    <div v-if = "noResult">
      <h4>Nu s-a găsit nici o construcție cu acest id.</h4>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import * as axios from './../../api'

import generalMixin from './../../mixins/general'
import constructionMixin from './../../mixins/construction'

import EditorMenu from './editors/EditorMenu.vue'

import LongConstr from './LongConstr.vue'
import TransConstr from './TransConstr.vue'


export default{
  mixins: [ generalMixin, constructionMixin ],
  props: ['id', 'year'],

  data() {
    return {
      construction: null,
      inventory:null,

      noResult: false
    }
  },

  methods: {
    ...mapActions(['invalidateConstructionsList', 'setupErrorMsg']),

    getConstructionInventory(year){
      if(this.construction.current_inventory.year == year){
        return this.construction.current_inventory
      }

      return this.construction.inventories_archive.find( inv => inv.year == year )
    },

    onDeleteConstruction(){
      if(!confirm("Esti sigur ca vrei sa stergi constructia impreuna cu toate inventarele aferente?")) return

      let url = 'constructions/'+this.construction._id
      let req = { url: url }

      axios._delete(req)
      .then( res => {
        console.log(res)
        this.invalidateConstructionsList()
        let filtersCopy =  this.jsonCopy(this.constrFilters)
        filtersCopy.page = 1
        this.$router.push({name: 'constructions-list', query:filtersCopy })
      })
      .catch( error => console.log(error) )
    }
  },

  computed: {
    ...mapGetters([ 'constrFilters', 'isAuthenticated']),

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
