<template>
  <div>

    <div class="row">
      <div class="col-sm-12">
        <h3>Distribuţie medie Ys funcţie de materiale de construcţie corp transversale</h3>
      </div>
    </div>

    <div v-if="!ysDistributionMaterials.updated">
      Fetch data
    </div>

    <div v-if="ysDistributionMaterials.updated && !ysDistributionMaterials.data.length">
      <no-data-chart></no-data-chart>
    </div>

    <div v-show="ysDistributionMaterials.updated && ysDistributionMaterials.data.length">
      <div class="row">
        <div class="col-sm-12">
          <canvas id="distributionChart" ref="distributionChart" ></canvas>
        </div>


        <div class="col-sm-12">
          <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Descriere</th>
              <th>Medie Ys</th>
              <th>Nr. construcţii</th>
              <th>Procent din total</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in chartData">
            <tr v-if="item.count">
              <td>{{ item.label }}</td>
              <td>{{ item.description }}</td>
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
import constrMixin from './../../mixins/construction'

import { mapGetters, mapActions } from 'vuex'

import NoDataChart from './NoDataChart.vue'

export default{
  props: [],
  mixins: [ chartMixin, constrMixin ],

  data() {
    return {

    }
  },

  methods: {
    ...mapActions(['fetchYsDistributionMaterialsData']),

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
    ...mapGetters([ 'ysDistributionMaterials' ]),

    chartData(){
      let cd = []

      let sortedData = this.ysDistributionMaterials.data

      if(!sortedData || !Array.isArray(sortedData)) return []


      let totalConstructions = sortedData.reduce(function(sum, val){
        return sum += parseInt(val.count) ? val.count : 0
      }, 0)

      sortedData.forEach( e => {
        if(e._id){

          console.log(' this.getConstrMaterialBySlug ', this.getConstrMaterialBySlug('mat_main_body', e._id))

          let material = this.getConstrMaterialBySlug('mat_main_body', e._id)

          let label = material && material.name ? material.name : ''
          let description = material && material.description ? material.description : ''


          cd.push({
            label: label,
            avgYs: parseFloat(e.avgYs).toFixed(2),
            count: e.count, percent: parseFloat(e.count * 100 / totalConstructions).toFixed(2),
            description: description
          })
        }
      } )

      return cd
    },
  },

  components: {
    NoDataChart
  },

  watch: {
    "ysDistributionMaterials": function(val){
      if(this.ysDistributionMaterials.updated){
        this.showChart()
      }
    }
  },

  created(){
    if(!this.ysDistributionMaterials.updated){
      console.log('request fetchysDistributionMaterialsData')
      this.fetchYsDistributionMaterialsData()
    }
  },

  mounted(){
    if(this.ysDistributionMaterials.updated){
      this.showChart()
    }
  }


}
</script>

<style>
</style>
