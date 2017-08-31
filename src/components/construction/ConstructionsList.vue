<template>
  <div class="row">

    <template v-if="listUpToDate">
      <div v-if="constructionsList.total">

    <div class="col-sm-6" ><b>Construcţii găsite: {{ constructionsList.total }}</b></div>
    <div class="col-sm-6 text-right">
      <button  v-if="isConstructionTypeSelected" target="_blank" href="#" @click.prevent="downloadList($event)" class="btn btn-primary">Download listă construcţii</button>
    </div>

<div class="col-sm-12" >
    <table class="table" v-if="constructionsList.total">
      <thead>
        <tr>
          <th>Cod cadastral # Cod lucrare</th>
          <th>Bazin</th>
          <th>Tip</th>
          <th>Anul ultimei inventarieri</th>
          <th>Ys</th>
        </tr>
      </thead>
      <tbody>
        <constructions-list-item v-for="construction in constructionsList.items" :construction="construction" :key="construction._id"></constructions-list-item>
      </tbody>
    </table>
  </div>


    <constructions-list-paginator
    :total = "constructionsList.total"
    :page = "constructionsList.page"
    :itemsPerPage = "constructionsList.itemsPerPage"
    @update="updateCurrentPage"></constructions-list-paginator>

  </div>
  <div v-else>
    <div class="text-center"><br /><br /><h3>Nu a fost gasita nici o lucrare</h3></div>
  </div>
</template>


<template v-else>
  <div class="text-center">Loading</div>
</template>
</div>
</template>

<script>

import generalMixin from './../../mixins/general'

const config = require('./../../../abht.config.js')

import { mapActions, mapGetters } from 'vuex'

import ConstructionsListItem from './ConstructionsListItem.vue'

import ConstructionsListPaginator from './ConstructionsListPaginator.vue'

export default{
  props: [],
  mixins: [ generalMixin ],
  data() {
    return {
    }
  },

  methods: {
    ...mapActions(['prepareConstructionsList', 'currentConstructionsSelectionListPage']),

    updateCurrentPage: function(page){
      console.log('page ', page)
      let newQuery = this.jsonCopy(this.$route.query)
      newQuery.page = page
      //delete newQuery.cadastral_code
      console.log(' newQuery ', newQuery)
      this.$router.replace({query: newQuery})
    },

    downloadList(){
      let query = this.jsonCopy(this.$route.query)
      let url = config.apiUrl + '/download/constructions-list'
      let params = Object.keys(query) .map( k => encodeURIComponent(k) + '=' + encodeURIComponent(query[k])).join('&')
      console.log(params)
      window.open(url+ '?' + params)
    }
  },

  computed:{
    ...mapGetters(['listUpToDate', 'constructionsList', 'constrFilters']),

    isConstructionTypeSelected(){
      return this.$route.query.type
    }
  }
  ,

  components: {
    ConstructionsListItem,
    ConstructionsListPaginator
  },

  watch: {
    'constructionsList': function(val){
      this.status = 'ready'
      console.log('constructionsList ' , val)
    },

    '$route.query': function(val){
      this.status = 'loading'
      console.log('this.$route.query ', this.$route.query)
      this.prepareConstructionsList(this.$route.query)
    }
  },

  created () {
    this.prepareConstructionsList(this.$route.query)
  }


}
</script>

<style>
</style>
