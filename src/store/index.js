import { createStore } from 'vuex'

import home from '@/store/modules/home'
import featured from '@/store/modules/featured'
import tags from '@/store/modules/tags'
import results from '@/store/modules/results'

const store = createStore({
  modules: {
    home,
    featured,
    tags,
    results
  },
  strict: process.env.DEBUG
})

export default store
