<template>
  <div :class="className" :style="{height:height,width:width}"/>
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
  mounted () {
    // 在生命周期函数mounted中，下面这个方法调用的意思是，页面加载出来就会自动渲染ECharts图
    // 其实就是调用了下面的initChart()
    // 如果想要触发某一个事件再渲染出ECharts图的话，就将initChart()写入要执行的方法中
    this.getData()
  },
  beforeCreate (qualifiedName, value) {
    document.querySelector('body').setAttribute('style', value)
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
          if (j === 'temp') {
            this.temp = this.jValue[j]// key所对应的value
          }
          console.log(this.temp)
        }
        this.initChart(this.temp)
      })
    },
    // 创建连接
    initChart: function () {
      this.chart = echarts.init(this.$el, 'macaroons')
      this.chart.setOption({
        series: [{
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 40,
          splitNumber: 8,
          itemStyle: {
            color: '#FFAB91'
          },
          progress: {
            show: true,
            width: 30
          },

          pointer: {
            show: true
          },
          axisLine: {
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: '15%',
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 60,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'auto'
          },
          data: [{
            value: this.temp
          }]
        },

        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 40,
          itemStyle: {
            color: '#FD7347'
          },
          progress: {
            show: true,
            width: 8
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{
            value: this.temp,
            name: 'temperature'
          }]

        }
        ]
      })
    }
  }
}
</script>
