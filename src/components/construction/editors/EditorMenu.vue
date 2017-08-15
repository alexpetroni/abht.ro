<template>
  <div class="editor-menu">
    <router-link :to="{ name: 'edit-construction', params:{ id:construction._id }}">edit construction</router-link>
    <router-link :to="{ name: 'edit-inventory', params:{ constructionId:construction._id, year:inventory.year }}">edit inventory</router-link>

    <router-link :to="{ name: 'add-inventory', params:{ constructionId:construction._id }}">add inventory</router-link>

    <a @click="deleteConstruction">delete construction</a>

  </div>
</template>

<script>

export default{
  props: [ 'construction', 'inventory' ],

  data() {
    return {

    }
  },

  methods: {
    deleteConstruction(){
      this.$emit('deleteConstruction')
    }
  },

  computed: {

  },

  components: {

  },

  watch: {

  },


}
</script>

<style>
.editor-menu a{
  cursor: pointer;
}
</style>
