import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../service/app.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    vectors: []
  },
  getters: {
    vectorsList: state => state.vectors
  },
  mutations: {
    getTagsSuccess (state, tags) {
      state.tags = tags
    },
    getVectorsSuccess (state, vectors) {
      state.vectors = vectors
    }
  },
  actions: {
    getTags ({ commit }) {
      appService.getTags()
        .then(tags => {
          commit('getTagsSuccess', tags)
        })
    },
    getVectors ({ commit }) {
      console.log('AQUÍ ENTRA!!!', appService)
      appService.getVectors()
        .then(vectors => {
          console.log('AQUÍ NO ENTRA!!!', vectors)
          commit('getVectorsSuccess', vectors)
        })
        .catch(error => console.log(error))
    }
  },
  modules: {
  }
})
