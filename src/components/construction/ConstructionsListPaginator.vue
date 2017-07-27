<template>
  <div class="row">
    <div class="col-xs-12 text-center">
      <button :disabled="page <= 1" class="btn btn-secondary"  @click="getPreviousPage()"> &laquo; </button>
      <span class=""> &nbsp; pagina {{ page }} / {{ totalPages }} &nbsp;</span>
      <button :disabled="page >= totalPages" class="btn btn-secondary" @click="getNextPage()"> &raquo; </button>
    </div>
  </div>
</template>

<script>

export default{
  props: ['page', 'itemsPerPage', 'total'],

  data() {
    return {

    }
  },

  methods: {
    getPreviousPage: function(){
      let prevPage = this.page -1
      if(prevPage >= 1){
        this.$emit('update', prevPage)
      }
    },

    getNextPage: function(){
      let nextPage = this.page +1
      if(nextPage <= this.totalPages){
        this.$emit('update', nextPage)
      }
    }
  },

  computed: {
    totalPages: function(){
      return Math.ceil(this.total/this.itemsPerPage)
    }
  },

  components: {

  },

  watch: {

  },


}
</script>

<style>
</style>
