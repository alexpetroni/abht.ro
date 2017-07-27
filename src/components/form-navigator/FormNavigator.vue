<template>
  <div class="form-navigator-wrapper">
  <div class="col-12-sm text-center">
  <form class="form-inline">

      <form-navigator-item v-for="(step, index) in formState.steps"
      :key = "index"
      :form-state = "formState"
      :current-step = "index"
      @showFormStep="onShowFormStep"
      ></form-navigator-item>

  </form>
</div>
</div>
</template>


<script>
import FormNavigatorItem from './FormNavigatorItem.vue'

export default{
  props: ['formState'],

  data() {
    return {

    }
  },

  methods: {
    onShowFormStep(data){
      this.$emit('showFormStep', data)
    }

  },

  computed: {

  },

  components: {
    FormNavigatorItem
  },


}
</script>


<style scoped>

</style>
