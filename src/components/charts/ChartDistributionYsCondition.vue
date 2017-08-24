<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <h3>Distribuţie Ys funcţie de stare</h3>
      </div>
    </div>

    <div v-if="!ysDistributionCondition.updated">
      Fetch data
    </div>

    <div v-if="ysDistributionCondition.updated && !ysDistributionCondition.data.length">
      <no-data-chart></no-data-chart>
    </div>

    <div v-show="ysDistributionCondition.updated && ysDistributionCondition.data.length">
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <canvas id="distributionChart" ref="distributionChart" ></canvas>
      </div>
      <div class="col-sm-12 col-md-8">
        <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Categorie de stare</th>
            <th>Medie Ys</th>
            <th>Nr. construcţii</th>
            <th>Procent din total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in chartData">
            <td> <i class="fa fa-square" aria-hidden="true" :style="'color: ' + item.backgroundColor + ';'  " ></i> {{ item.label }} <span class="explain">{{ item.explain }}</span></td>
            <td>{{ item.avgYs }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.percent }} %</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import Chart from 'chart.js'

import chartMixin from './../../mixins/chart'

import { mapGetters, mapActions } from 'vuex'

import config from './../../../abht.config.js'

import NoDataChart from './NoDataChart.vue'

export default{
  props: [],
  mixins: [ chartMixin ],

  data() {
    return {
      colorMapCategory: [
        {  data_id: "1_interval_0_20" , color: 'red', label: "Stare foarte proastă", explain: "Ys <= 20" },
        {  data_id: "2_interval_20_40" , color: 'orange', label: "Stare proastă", explain: "20 < Ys <= 40"},
        {  data_id: "3_interval_40_60" , color: 'yellow', label: "Stare medie", explain: "40 < Ys <= 60"},
        {  data_id: "4_interval_60_80" , color: 'green', label: "Stare bună", explain: "60 < Ys <= 80"},
        {  data_id: "5_interval_80_100" , color: 'blue', label: "Stare foarte bună", explain: "80 < Ys <= 100" },
      ]
    }
  },

  methods: {
    ...mapActions(['fetchYsDistributionConditionData']),

    showChart(){
      let ctx = this.$refs.distributionChart.getContext('2d')



      let dataSet = {
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: []
        }

        let labels = []

        let chartColors = config.chart.colors
        let bgTrans = config.chart && config.chart.bgTranspareny ? config.chart.bgTranspareny : 0.2
        let borderTrans = config.chart && config.chart.borderTransparency ? config.chart.borderTransparency : 1

      this.colorMapCategory.forEach(e => {
        labels.push(e.label)

        let dataItem = this.ysDistributionCondition.data.find( d => e.data_id == d._id  )
        if(dataItem){
          dataSet.data.push(dataItem.count)
        }else{
          dataSet.data.push(0)
        }


        dataSet.backgroundColor.push( this.getChartBackgroundColor(e.color) )
        dataSet.borderColor.push( this.getChartBorderColor(e.color) )
      })

      let chartData = {
        labels: labels,
        datasets: [dataSet]
      }

      var distributionChart = new Chart(ctx, {
              type: 'pie',
              data: chartData,
              options: {
                legend: {
                  // display: false
                  position: 'bottom'
                }
              }
          });
    }
  },

  computed: {
    ...mapGetters([ 'ysDistributionCondition' ]),

    chartData(){
      let cd = []

      let totalConstructions = this.ysDistributionCondition.data.reduce(function(sum, elem){ return sum + elem.count }, 0)


      this.colorMapCategory.forEach(e => {
        let item = Object.assign({}, e)

        let dataItem = this.ysDistributionCondition.data.find( d => e.data_id == d._id  )
        if(dataItem){
          item.count = dataItem.count
          item.avgYs = parseFloat(dataItem.avgYs).toFixed(2)
        }else{
          item.count = 0
          item.avgYs = 0
        }

        item.percent = (item.count * 100 / totalConstructions).toFixed(2)

        item.backgroundColor = this.getChartBackgroundColor(e.color)
        item.borderColor = this.getChartBorderColor(e.color)

        cd.push(item)
      })

      return cd
    }
  },

  components: {
    NoDataChart
  },

  watch: {
    "ysDistributionCondition": function(val){
      if(this.ysDistributionCondition.updated){
        this.showChart()
      }
    }
  },

  created(){
    if(!this.ysDistributionCondition.updated){
      console.log('request fetchYsDistributionConditionData')
      this.fetchYsDistributionConditionData()
    }
  },

  mounted(){
    if(this.ysDistributionCondition.updated){
      this.showChart()
    }
  }


}
</script>

<style>
.explain{
  font-size: .75em;
}
</style>
