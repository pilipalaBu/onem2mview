import Vue from 'vue'
import VueRouter from 'vue-router'
import humidity from '@/components/humidity'
import Home from '@/views/Home'
import temper from '@/components/temper_Chart'
import airhumidity from '@/components/airhumidity'
import Watering from '@/components/Watering'
import HelloWorld from '@/components/HelloWorld'
import deep from '@/components/deep'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/HelloWorld',
      children: [
        { path: '/HelloWorld', component: HelloWorld },
        { path: '/humidity', component: humidity },
        { path: '/temper', component: temper },
        { path: '/airhumidity', component: airhumidity },
        { path: '/deep', component: deep },
        { path: '/Watering', component: Watering }
      ]
    }
  ],
  mode: 'history'
})

export default router
