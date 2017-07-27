<template>
  <div>
    <h5>ERROR: {{ errorMsg }}</h5>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default{

  props: [],

  data() {
    return {
    }
  },

  methods: {

  },

  computed: {
    ...mapGetters(['errorMsg'])
  },

  components: {

  },

  watch: {

  },


}
</script>

<style>
</style>
