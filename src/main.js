import { createApp } from 'vue'
import './registerServiceWorker'

import VueMatomo from 'vue-matomo'
import VueScrollTo from 'vue-scrollto'
import ColorInput from 'vue-color-input'

import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .use(VueMatomo, {
    host: process.env.VUE_APP_MATOMO_HOST,
    siteId: process.env.VUE_APP_MATOMO_SITE_ID,
    router: router,
    disableCookies: true,
    enableHeartBeatTimer: true,
    heartBeatTimerInterval: 10
  })
  .use(VueScrollTo, {
    duration: 500,
    easing: 'ease'
  })
  .use(ColorInput)
  .mount('#app')
