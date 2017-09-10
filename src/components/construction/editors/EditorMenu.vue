<template>
  <div class="editor-menu">
    <router-link :to="{ name: 'edit-construction', params:{ id:construction._id }}"><button class="btn btn-primary">Editează construcție</button></router-link>
    <router-link :to="{ name: 'edit-inventory', params:{ constructionId:construction._id, year:inventory.year }}"><button class="btn btn-primary">Editează inventar</button></router-link>

    <router-link :to="{ name: 'add-inventory', params:{ constructionId:construction._id }}"><button class="btn btn-primary">Adaugă inventar</button></router-link>

    <a @click="deleteConstruction"><button class="btn btn-primary">Șterge construcție</button></a>

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
