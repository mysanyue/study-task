import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../vueRouter/hash'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "home" */ '../views/home')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import( /* webpackChunkName: "muisc" */ '../views/music'),
    children: [{
      path: 'list',
      name: 'MusicList',
      component: () => import( /* webpackChunkName: "muisc-list" */ '../views/components/musicList')
    }, {
      path: 'detail',
      name: 'MusicDetail',
      component: () => import( /* webpackChunkName: "muisc-detail" */ '../views/components/muiscDetail')
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/about')
  }, {
    path: '/default',
    name: 'Home',
    component: () => import( /* webpackChunkName: "home" */ '../views/home')
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router