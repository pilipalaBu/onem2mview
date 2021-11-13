<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
require('echarts/theme/macarons') // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.getData()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getData () {
      axios.get('http://onem2m.baluobo.top:7579/Mobius/ae_test/cnt_test02/la', {
        // params: data,
        headers: {
          'X-M2M-Origin': 's',
          'X-M2M-RI': '12345'
        }// 设置header信息
      }).then((res) => {
        this.dataData = res.data
        console.log(res.data)
        for (const item in this.dataData) {
          this.jValue = this.dataData[item]
        }
        for (const i in this.jValue) {
          if (i === 'con') {
            this.jValue = this.jValue[i]// key所对应的value
            console.log(this.jValue)
          }
        }
        for (const j in this.jValue) {
          if (j === 'soil') {
            this.soil = this.jValue[j]// key所对应的value
          }
          console.log(this.soil)
        }
        this.initChart(this.soil)
      })
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macaroons')
      this.chart.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [{
            value: this.soil,
            name: 'Soil Humidity'
          }]
        }]
      })
    }
  }
}
</script>
