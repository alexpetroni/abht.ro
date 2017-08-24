<template>
  <div>


    <div class="row">
      <div class="col-sm-12">
        <h3>Distribuţie medie Ys pe bazine</h3>
      </div>
    </div>

    <div v-if="!ysDistributionBasin.updated">
      Fetch data
    </div>

    <div v-if="ysDistributionBasin.updated && !ysDistributionBasin.data.length">
      <no-data-chart></no-data-chart>
    </div>

    <div v-show="ysDistributionBasin.updated && ysDistributionBasin.data.length">

    <div v-if="ysDistributionBasin.updated">
    <table  class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Cod bazin</th>
        <th>Medie Ys</th>
        <th>Nr. total constructii</th>
        <th>Transversale / Longitudinale</th>
        <th>Procent din total</th>
      </tr>
    </thead>
    <tbody>
      <template  v-for="item in chartData">
      <tr v-if="item">
        <td>{{ item.cadastralCode }}</td>
        <td>{{ item.avgYs }}</td>
        <td>{{item.count}}</td>
        <td>{{ item.raportTransLong }}</td>
        <td>{{ item.percent }} %</td>
      </tr>
    </template>
    </tbody>
  </table>
    </div>


  </div>
</div>
</template>

<script>
import NoDataChart from './NoDataChart.vue'

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

      let totalConstructions = this.ysDistributionBasin.totalConstructions

      this.ysDistributionBasin.data.forEach(e => {
        if(e._id){
          let item = {
            cadastralCode: e._id.breadcrumb,
            count: e.count,
            avgYs: parseFloat(e.avgYs).toFixed(2),
            raportTransLong: (e.countTrans + '/' + (e.count-e.countTrans)),
            percent: parseFloat(e.count * 100 / totalConstructions).toFixed(2)
          }

          cd.push(item)
        }

      })

      cd.sort(function(a, b){
        let aUp = a.cadastralCode.toUpperCase()
        let bUp = b.cadastralCode.toUpperCase()
        return aUp < bUp ? -1 : ( aUp > bUp ? 1 : 0 )
      })

      return cd
    }
  },

  components: {
    NoDataChart
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
