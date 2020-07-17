import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../service/app.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    vectors: [],
    filteredVectors: [],
    searchTags: [],
    loading: false
  },
  getters: {
    tagsList: state => state.tags,
    filteredVectorsList: state => state.filteredVectors,
    searchTags: state => state.searchTags,
    loading: state => state.loading
  },
  mutations: {
    getTagsSuccess (state, tags) {
      state.tags = tags
    },
    getVectorsSuccess (state, vectors) {
      state.filteredVectors = vectors
    },
    getVectorsByTagSuccess (state, payload) {
      state.filteredVectors = payload.vectors
      state.searchTags = payload.tags
    },
    clearSearchTags (state) {
      state.searchTags = []
    },
    clearFilteredVectors (state) {
      state.filteredVectors = []
    },
    updateSearchTags (state, tag) {
      state.searchTags.push(tag)
    },
    removeSearchTag (state, tag) {
      const index = state.searchTags.findIndex(it => it === tag)
      state.searchTags.splice(index, 1)
    },
    setLoading (state, activate) {
      state.loading = activate
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
      commit('setLoading', true)
      appService.getVectors()
        .then(vectors => {
          commit('getVectorsSuccess', vectors)
          commit('setLoading', false)
        })
        .catch(error => console.log(error))
    },
    getVectorByTag ({ commit }, tags) {
      appService.getVectorByTag(tags)
        .then(vectors => {
          commit('getVectorsByTagSuccess', { vectors, tags })
        })
    }
  },
  modules: {
  }
})
