<template>
  <div>

    <div class="row">
      <div class="col-sm-12">
        <h3>Distribuţie medie Ys pe decade</h3>
      </div>
    </div>

    <div v-if="!ysDistributionDecade.updated">
      Fetch data
    </div>
    <div v-show="ysDistributionDecade.updated">
    <div class="row">
      <div class="col-sm-12">
        <canvas id="distributionChart" ref="distributionChart" ></canvas>
      </div>
      <div class="col-sm-12">
        <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Decada</th>
            <th>Medie Ys</th>
            <th>Nr. construcţii</th>
            <th>Procent din total</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in chartData">
          <tr v-if="item.count">
            <td>{{ item.label }}</td>
            <td>{{ item.avgYs }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.percent }} %</td>
          </tr>
        </template>
        </tbody>
      </table>
      </div>
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
    ...mapActions(['fetchYsDistributionDecadeData']),

    showChart(){
      let ctx = this.$refs.distributionChart.getContext('2d')



      let dataSet = {
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: []
        }

        let labels = []

      this.chartData.forEach(e => {
        labels.push(e.label)
        dataSet.data.push(e.avgYs)
      })

      let chartData = {
        labels: labels,
        datasets: [dataSet]
      }

      var distributionChart = new Chart(ctx, {
              type: 'bar',
              data: chartData,
              options: {
                legend: {
                  position: 'bottom'
                }
              }
          });
    }
  },

  computed: {
    ...mapGetters([ 'ysDistributionDecade' ]),

    chartData(){
      let cd = []

      let sortedData = this.ysDistributionDecade.data

      if(!sortedData || !Array.isArray(sortedData)) return []

      let decadesArr = []
      let totalConstructions = 0

      sortedData.forEach( e => {
        if(e._id && parseInt(e._id)){
          decadesArr.push(e._id)
        }
        if(e.count){
          totalConstructions += e.count
        }
      } )

      let maxDecade = Math.max(...decadesArr)
      let minDecade = Math.min(...decadesArr)

      console.log('minDecade ' , minDecade , ' maxDecade ', maxDecade )

      for(let dec = minDecade; dec <= maxDecade; dec += 10){
        let avgYs = 0
        let count = 0
        let percent = 0
        let decadeData = sortedData.find(e => e._id == dec)
        if(decadeData){
          avgYs = parseFloat( decadeData.avgYs ).toFixed(2)
          count = decadeData.count ? decadeData.count : 0

          percent = totalConstructions ? parseFloat(count * 100 / totalConstructions).toFixed(2) : 0
        }
        cd.push({label: dec, avgYs: avgYs, count: count, percent: percent })
      }

      return cd
    }
  },

  components: {

  },

  watch: {
    "ysDistributionDecade": function(val){
      if(this.ysDistributionDecade.updated){
        this.showChart()
      }
    }
  },

  created(){
    if(!this.ysDistributionDecade.updated){
      console.log('request fetchysDistributionDecadeData')
      this.fetchYsDistributionDecadeData()
    }
  },

  mounted(){
    if(this.ysDistributionDecade.updated){
      this.showChart()
    }
  }


}
</script>

<style>
</style>
