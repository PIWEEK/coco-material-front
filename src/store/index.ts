import Vue from 'vue'
import Vuex from 'vuex'

import home from '@/store/modules/home'
import tags from '@/store/modules/tags'
import results from '@/store/modules/results'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    tags,
    results
  },
  strict: process.env.DEBUG
})

export default store
