import config from './../../abht.config.js'

const chartMixin = {
  methods: {
    getChartBackgroundColor(color){

      let colorsArr = config.chart && config.chart.colors && config.chart.colors ? config.chart.colors : []

      let bgTrans = config.chart && config.chart.bgTranspareny ? config.chart.bgTranspareny : 0.2

      let bgColor = colorsArr[color] ?  `rgba( ${colorsArr[color]}, ${bgTrans} )` : 'rgba(255, 255, 255, 1)'
    console.log('bgColor' , bgColor)
      return bgColor
    },

    getChartBorderColor(color){
      let colorsArr = config.chart && config.chart.colors && config.chart.colors ? config.chart.colors : []

      let borderTrans = config.chart && config.chart.borderTransparency ? config.chart.borderTransparency : 1

      let borderColor = colorsArr[color] && colorsArr[color] ?  `rgba( ${colorsArr[color]}, ${borderTrans} )` : 'rgba(255, 255, 255, 1)'
      console.log('borderColor' , borderColor)
      return borderColor
    }
  }
}

export default chartMixin
