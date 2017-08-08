<template>

  <div>
    <div v-if="construction">
      <div class="text-right">
        <router-link
        :to="{
          name: 'construction',
          params:{ id: construction._id }
        }"
        >Vizualizare constructie</router-link></div>
        <h3>{{ title }}</h3>

      <component
      :is="constructionEditType"
      :construction="construction"
      @constructionUpdated = "constructionUpdated"
      ></component>
    </div>

  </div>
</template>

<script>
import * as axios from './../../../api'

import constructionMixin from './../../../mixins/construction'


import EditorLongConstr from './EditorLongConstr.vue'
import EditorTransConstr from './EditorTransConstr.vue'

export default{
  mixins: [ constructionMixin ],
  props: ['id'],

  data() {
    return {
      construction: null
    }
  },

  methods: {
    constructionUpdated(data){
      console.log(' constructionUpdated(data) ')
      console.log(data)
      this.construction = data
    },

    setConstructionFromData(data){
      this.construction = data
      this.parseCadastralCodeToArr();
    },

    parseCadastralCodeToArr(){
        let cc = this.constructions.gd.cadastral_code
        if(cc && cc.breadcrumb){
          let elArr = cc.breadcrumb.split('-')
          elArr[0] = cc.ancestors[0]
          this.this.constructions.gd.__cadastral_code_items_arr = [...elArr]
        }
    },
  },

  computed: {
    constructionEditType(){
      if(this.isLongitudinal){
        return 'editor-long-constr'
      }else{
        return 'editor-trans-constr'
      }
    },

    title(){
      let title = 'Editare'
      if(this.isLongitudinal){
        title += ' fișă canal de evacuare'
      }else{
        title += ' fișă lucrare transversală'
      }
      title += ' ' + this.construction.gd.basin_name
      title += ' ' + this.getConstructionCadastralCode()
      title += ' ' + this.construction.gd.construction_code
      return title
    }
  },

  components: {
    EditorLongConstr,
    EditorTransConstr
  },

  watch: {

  },

  created(){
    console.log(' id '+ this.id )
    if(this.id){
      const req = { url: '/constructions/' + this.id }
      axios._get( req )
    .then( res => {
      console.log(res)
      if(res.data.inventories){
        delete res.data.inventories
      }

      this.setConstructionFromData(res.data)
      console.log('incarcat')
      console.log(this.construction)
    })
    .catch(err => console.log(err))
    }
  },


}
</script>

<style>
</style>
