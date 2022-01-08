import { createStore } from 'vuex'

import home from '@/store/modules/home'
import tags from '@/store/modules/tags'
import results from '@/store/modules/results'

const store = createStore({
  modules: {
    home,
    tags,
    results
  },
  strict: process.env.DEBUG
})

export default store
