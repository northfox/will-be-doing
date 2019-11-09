import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
