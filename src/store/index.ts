import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../service/app.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    vectors: [],
    filteredVectors: []
  },
  getters: {
    vectorsList: state => state.vectors,
    filteredVectorsList: state => state.filteredVectors
  },
  mutations: {
    getTagsSuccess (state, tags) {
      state.tags = tags
    },
    getVectorsSuccess (state, vectors) {
      state.vectors = vectors
    },
    getVectorsByTagSuccess (state, vectors) {
      state.filteredVectors = vectors
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
      appService.getVectors()
        .then(vectors => {
          commit('getVectorsSuccess', vectors)
        })
        .catch(error => console.log(error))
    },
    getVectorByTag ({ commit }, tag) {
      appService.getVectorByTag(tag)
        .then(vectors => {
          commit('getVectorsByTagSuccess', vectors)
        })
    }
  },
  modules: {
  }
})
