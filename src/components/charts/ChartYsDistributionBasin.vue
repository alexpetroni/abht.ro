<template>
  <div>


    <div class="row">
      <div class="col-sm-12">
        <h3>Distributie medie Ys pe bazine</h3>
      </div>
    </div>
    <div v-if="!ysDistributionBasin.updated">
      Fetch data
    </div>
    <div v-show="ysDistributionBasin.updated">
    <div v-if="ysDistributionBasin.updated">
    <table  class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Cod bazin</th>
        <th>Medie Ys</th>
        <th>Nr. total constructii</th>
        <th>Transversale / Longitudinale</th>
        <th>%</th>
      </tr>
    </thead>
    <tbody>
      <template  v-for="item in chartData">
      <tr v-if="item">
        <td>{{ item.cadastralCode }}</td>
        <td>{{ item.avgYs }}</td>
        <td>{{item.count}}</td>
        <td>{{ item.raportTransLong }}</td>
        <td></td>
      </tr>
    </template>
    </tbody>
  </table>
    </div>

    <div v-else>
      Fetch data
    </div>
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
    ...mapActions(['fetchYsDistributionBasinData']),
  },

  computed: {
    ...mapGetters([ 'ysDistributionBasin' ]),

    chartData(){
      let cd = []

      if(!this.ysDistributionBasin.data || ! Array.isArray(this.ysDistributionBasin.data)) return cb

      let constructionsTotal = 0

      this.ysDistributionBasin.data.forEach(e => {
        if(e._id){
          let item = {
            cadastralCode: e._id.breadcrumb,
            count: e.count,
            avgYs: parseFloat(e.avgYs).toFixed(2),
            raportTransLong: (e.countTrans + '/' + (e.count-e.countTrans))
          }

          cd.push(item)
        }

      })

      return cd
    }
  },

  components: {

  },

  watch: {

  },

  created(){
    if(!this.ysDistributionBasin.updated){
      console.log('request fetchYsDistributionBasinData')
      this.fetchYsDistributionBasinData()
    }
  }


}
</script>

<style>
</style>
