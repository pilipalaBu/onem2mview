<template>
  <div>
    <el-container class="home-container" style="width:100%; height:100%">
      <el-header>
        <div style="background-image:url(#);">
          <span style="font-size: xx-large; color:rgb(71,125,96)">Succulent Care System</span>
        </div>
      </el-header>
      <el-container style="height:100%">
        <el-aside :width="isCollapse ? '300px' : '400px'"
                   height="100%">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :router="true" >
            <!-- 一级菜单 -->
            <el-menu-item index="watering">
              <i class="el-icon-setting"></i>
              <span slot="title">Water & Refresh</span>
            </el-menu-item>
            <el-menu-item index="temper">
              <i class="el-icon-menu"></i>
              <span slot="title">Temperature</span>
            </el-menu-item>
            <el-menu-item index="humidity">
              <i class="el-icon-menu"></i>
              <span slot="title">Soil Humidity</span>
            </el-menu-item>
            <el-menu-item index="airhumidity">
              <i class="el-icon-menu"></i>
              <span slot="title">Air Humidity</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>

  <!--<button @click="getData()">点我</button>-->

</template>

<script >
import mqtt from 'mqtt'
import axios from 'axios'
export default {
  name: 'Home',
  beforeCreate (qualifiedName, value) {
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
      tem: 12,
      co2: 400,
      light: 40,
      soil: 83,
      water: 1,
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
        payload: '{"1"}'
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
  components: {
    // sunshine,
    // temperChart,
    // humidity
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
          if (j === 'tem') {
            this.tem = this.jValue[j]// key所对应的value
            console.log('tem:' + this.tem)
          }
          if (j === 'hum') {
            this.tem = this.jValue[j]// key所对应的value
            console.log('hum:' + this.hum)
          }
          if (j === 'CO2') {
            this.tem = this.jValue[j]// key所对应的value
            console.log('CO2:' + this.co2)
          }
          if (j === 'light') {
            this.tem = this.jValue[j]// key所对应的value
            console.log('light:' + this.light)
          }
          if (j === 'soil') {
            this.tem = this.jValue[j]// key所对应的value
            console.log('soil:' + this.soil)
          }
          if (j === 'water') {
            this.tem = this.jValue[j]// key所对应的value
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
.el-menu-item{
  font-size: x-large;
}

.el-menu{
  height:100%;
  background-color: #fff;
  font-size: xx-large!important;
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F18%2F20160418160648_MXaYd.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638448008&t=d4b21519065e9f23fe5ff6bf108df120");
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: 60px 300px;
}
.el-aside {
  margin: 0;
  height: 700px;
  width: 200px;
  display: block;
  position: relative;
  background-color: #324157 !important;
}

.temper{
  float: left;
}
.humidity{
  float: right;
}
.el-main{
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F08%2F20151208214549_PNeYQ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638452767&t=daaab75ded410c4e2c5d44801223d0b4");
  background-repeat: no-repeat;
  background-position: 650px 300px;
  background-size: 30%;
}

</style>
