import Vue from 'vue'
import App from './App.vue'

// vuex && vue-router
import router from '@/router'
import store from '@/store'

console.log(router)
// UI
import ElementUI from 'element-ui'

Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

window.vm = vm

console.log('window.vm: ', window.vm)
