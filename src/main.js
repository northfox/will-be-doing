import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'
import axios from 'axios'
import constsnts from './utils/constsnts'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs
Vue.prototype.$axios = axios
Vue.prototype.$constsnts = constsnts

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
