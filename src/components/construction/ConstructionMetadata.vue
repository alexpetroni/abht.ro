<template>
  <div>
    <div>Istoric editare</div>
    <div v-if="construction.author" class="metadata">
      <div>Editor constructie {{construction.author.last_name}} {{construction.author.first_name}} la data {{ construction.date_added }}</div>
      <div v-if="construction.last_edit_author"> Ultima editare constructie {{construction.last_edit_author.last_name}} {{construction.last_edit_author.first_name}} la data {{ construction.date_last_modified }}</div>
    </div>

    <div v-if="inventory.author" class="metadata">
      <div>Editor inventar {{inventory.author.last_name}} {{inventory.author.first_name}} la data {{ inventory.date_added }}</div>
      <div v-if="inventory.last_edit_author"> Ultima editare inventar {{inventory.last_edit_author.last_name}} {{inventory.last_edit_author.first_name}} la data {{ inventory.date_last_modified }}</div>
    </div>
  </div>
</template>

<script>

export default{
  props: ['construction', 'inventory'],

  data() {
    return {

    }
  },

  methods: {

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
</style>
