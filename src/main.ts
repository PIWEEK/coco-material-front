import Vue from 'vue'
import VueMatomo from 'vue-matomo'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(VueMatomo, {
  host: process.env.VUE_APP_MATOMO_HOST,
  siteId: process.env.VUE_APP_MATOMO_SITE_ID,
  router: router,
  disableCookies: true,
  enableHeartBeatTimer: true,
  heartBeatTimerInterval: 10
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
