import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = resolve => require(['@/pages/home/home'], resolve)
const settlement = resolve => require(['@/pages/settlement/settlement'], resolve)
const pay = resolve => require(['@/pages/pay/pay'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/settlement/:selectFoods/:peopleNum',
      name: 'settlement',
      component: settlement
    },
    {
      path: '/pay/:payPrice',
      name: 'pay',
      component: pay
    }
  ]
})
