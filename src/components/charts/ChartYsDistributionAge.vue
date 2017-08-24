<template>
  <div>

    <div class="row">
      <div class="col-sm-12">
        <h3>Distribuţie medie Ys funcţie de varsta</h3>
      </div>
    </div>

    <div v-if="!ysDistributionAge.updated">
      Fetch data
    </div>

    <div v-if="ysDistributionAge.updated && !ysDistributionAge.data.length">
      <no-data-chart></no-data-chart>
    </div>

    <div v-show="ysDistributionAge.updated && ysDistributionAge.data.length">

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
          <template v-for="item in tableData">
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
import chartMixin from './../../mixins/chart'

import { mapGetters, mapActions } from 'vuex'

import NoDataChart from './NoDataChart.vue'

export default{
  props: [],
  mixins: [ chartMixin ],
  data() {
    return {

    }
  },

  methods: {
    ...mapActions(['fetchYsDistributionAgeData']),

    showChart(){
      let ctx = this.$refs.distributionChart.getContext('2d')



      let dataSet = {
          label: '# medie Ys',
          data: [],
          backgroundColor: [],
          borderColor: []
        }

        let labels = []

        let bgColor = this.getChartBackgroundColor('blue')
        let borderColor = this.getChartBorderColor('blue')

        console.log('borderColor ', borderColor)

      this.chartData.forEach(e => {
        labels.push(e.label)
        dataSet.data.push(e.avgYs)
        dataSet.backgroundColor.push( bgColor )
        dataSet.borderColor.push( borderColor )
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
                },

                scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                              max : 100,
                          }
                      }]
                  }
              }
          });
    }
  },

  computed: {
    ...mapGetters([ 'ysDistributionAge' ]),

    chartData(){
      let cd = []

      let sortedData = this.ysDistributionAge.data

      if(!sortedData || !Array.isArray(sortedData)) return []

      let yearsArr = []
      let totalConstructions = 0

      sortedData.forEach( e => {
        if(e._id && parseInt(e._id)){
          yearsArr.push(e._id)
        }
        if(e.count){
          totalConstructions += e.count
        }
      } )

      let minYear = Math.min(...yearsArr)
      let maxYear = Math.max(...yearsArr)



      for(let dec = minYear; dec <= maxYear; dec += 1){
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
    },

    tableData(){
      let td = this.chartData.slice()
      return td.reverse()
    }
  },

  components: {
    NoDataChart
  },

  watch: {
    "ysDistributionAge": function(val){
      if(this.ysDistributionAge.updated){
        this.showChart()
      }
    }
  },

  created(){
    if(!this.ysDistributionAge.updated){
      console.log('request fetchysDistributionAgeData')
      this.fetchYsDistributionAgeData()
    }
  },

  mounted(){
    if(this.ysDistributionAge.updated){
      this.showChart()
    }
  }


}
</script>

<style>
</style>
