<template>
    <div>
      <el-row>
        <el-button type="primary" round="true" class="grid-content bg-purple" @click="getData">Temperature: {{this.temp}} ℃</el-button>
        <el-button type="primary" round="true" @click="getData">Soil Humidity: {{this.soil}} %</el-button>
        <el-button type="primary" round="true" @click="getData">Air Humidity: {{this.hum}} %</el-button><br><br>
        <el-button type="primary" round="true" @click="getData">Light Intensity: {{this.light}} </el-button>
        <el-button type="primary" round="true" @click="getData">Carbon Dioxide: {{this.co2}} </el-button>
        <el-button type="primary" round="true" @click="getData">Water Depth: {{this.water}} mm</el-button>
      </el-row><br>
      <el-button type="primary" round="true" @click="watering()">Water</el-button>
      <el-button type="primary" round="true" @click="getData()">Refresh</el-button>
      <el-button type="primary" round="true" >
        <a href="https://www.thespruce.com/grow-healthy-succulent-plants-1902806" target="_blank">Care Guide</a>
      </el-button><br><br>
      <br>
      <br><br>
    </div>
</template>

<script >
import mqtt from 'mqtt'
import axios from 'axios'
export default {
  name: 'Watering',
  beforeCreate () {
    // eslint-disable-next-line no-undef
    document.querySelector('body').setAttribute('style', value)
    // #0f375f
  },

  data () {
    return {
      isCollapse: false,
      activePath: '',
      dataData: {},
      jValue: {},
      hum: 30,
      temp: 12,
      co2: 400,
      light: 35,
      soil: 85,
      water: 10,
      connection: {
        host: 'iot.baluobo.top',
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_3be2c321',
        username: 'emqx_test',
        password: 'emqx_test'
      },
      publish: {
        topic: 'oneM2M/browser',
        qos: 0,
        payload: '1'
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 }
      ],
      client: {
        connected: false
      },
      subscribeSuccess: false
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    getData () {
      axios.get('http://onem2m.baluobo.top:7579/Mobius/ae_test/cnt_test02/la', {
        // params: data,
        headers: {
          'X-M2M-Origin': 's',
          'X-M2M-RI': '12345'
        }// 设置header信息
      }).then((res) => {
        this.dataData = res.data
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
            console.log('temp:' + this.temp)
          }
          if (j === 'hum') {
            this.hum = this.jValue[j]// key所对应的value
            console.log('hum:' + this.hum)
          }
          if (j === 'co2') {
            this.co2 = this.jValue[j]// key所对应的value
            console.log('co2:' + this.co2)
          }
          if (j === 'light') {
            this.light = this.jValue[j]// key所对应的value
            console.log('light:' + this.light)
          }
          if (j === 'soil') {
            this.soil = this.jValue[j]// key所对应的value
            console.log('soil:' + this.soil)
          }
          if (j === 'water') {
            this.water = this.jValue[j]// key所对应的value
            console.log('water:' + this.water)
          }
        }
      })
    },
    // 创建连接
    createConnection () {
      // 连接字符串, 通过协议指定使用的连接方式
      // ws 未加密 WebSocket 连接
      // wss 加密 WebSocket 连接
      // mqtt 未加密 TCP 连接
      // mqtts 加密 TCP 连接
      // wxs 微信小程序连接
      // alis 支付宝小程序连接
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
      })
    },
    doPublish () {
      const { topic, qos, payload } = this.publish
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
    },
    watering () {
      this.createConnection()
      this.doPublish()
    }
  }
}
</script>

<style Lang="less" scoped >
.el-button {
  align: center;
  width: 200px;
  height: 130px;
  font-size: large;
  color: rgb(71,125,96);
  background-color: #ffffff;
  border-color: rgb(71,125,96);
}
</style>
