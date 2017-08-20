<template>
  <div class="row">

    <template v-if="listUpToDate">
      <div v-if="constructionsList.total">
    <div class="col-12-sm" ><b>Constructii gasite: {{ constructionsList.total }}</b></div>

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
    }
  },

  computed:{
    ...mapGetters(['listUpToDate', 'constructionsList', 'constrFilters']),
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
