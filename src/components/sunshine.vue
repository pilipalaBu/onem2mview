<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
require(

  'echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1200px'
    },
    height: {
      type: String,
      default: '700px'
    }
  },
  data () {
    return {
      chart: null,
      category: [],
      dottedBase: +new Date(),
      lineData: []
    }
  },
  mounted () {
    this.getData()
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);')
    // #0f375f
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
          if (j === 'light') {
            this.light = this.jValue[j]// key所对应的value
          }
          console.log(this.light)
        }
        this.initChart(this.light)
      })
    },
    initChart () {
      for (let i = 0; i < 20; i++) {
        const date = new Date(this.dottedBase += 3600 * 24 * 1000)
        this.category.push([
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        ].join('-'))
        const b = this.light
        this.lineData.push(b)
      }
      this.chart = echarts.init(this.$el, 'macaroons')
      this.chart.setOption({
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['light'],
          textStyle: {
            color: '#ccc'
          }
        },
        xAxis: {
          data: this.category,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [{
          name: 'light',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: this.light
        }, {
          name: 'carbon',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' }
              ]
            )
          },
          data: this.CO2
        }, {
          name: 'light',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(20,200,212,0.5)' },
                { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                { offset: 1, color: 'rgba(20,200,212,0)' }
              ]
            )
          },
          z: -12,
          data: this.line
        }, {
          name: 'carbon',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#0f375f'
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: this.CO2
        }]

      })
    }
  }
}

</script>
