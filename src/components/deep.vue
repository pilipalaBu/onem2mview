<template>
  <div :class="className" :style="{height:height,width:width}"></div>
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
  beforeCreate () {
    // eslint-disable-next-line no-undef
    document.querySelector('body').setAttribute('style', value)
    // #0f375f
  },
  mounted () {
    this.getData()
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
          if (j === 'water') {
            this.water = this.jValue[j]// key所对应的value
          }
          console.log(this.water)
        }
        this.initChart(this.water)
      })
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macaroons')

      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [48, 53, 45, 40, 38, 46, this.water],
          type: 'line',
          symbol: 'triangle',
          symbolSize: 20,
          lineStyle: {
            color: '#5470C6',
            width: 4,
            type: 'dashed'
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: '#EE6666',
            color: 'yellow'
          }
        }]

      })
    }
  }
}
</script>
