<template>
  <div>
    <h5>Distributie Ys functie de stare</h5>

    <div v-if="ysDistributionCondition.updated">
    </div>

    <div v-else>
      Fetch data
    </div>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default{
  props: [],

  data() {
    return {

    }
  },

  methods: {
    ...mapActions(['fetchYsDistributionConditionData']),
  },

  computed: {
    ...mapGetters([ 'ysDistributionCondition' ]),
  },

  components: {

  },

  watch: {

  },

  created(){
    if(!this.ysDistributionCondition.updated){
      console.log('request fetchYsDistributionConditionData')
      this.fetchYsDistributionConditionData()
    }
  }


}
</script>

<style>
</style>
