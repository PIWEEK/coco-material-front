import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../service/app.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    filteredVectors: [],
    searchTags: [],
    loading: false,
    totalResults: null,
    paginationArray: [],
    featuredVectors: null
  },
  mutations: {
    getTagsSuccess (state, tags) {
      state.tags = tags
    },
    getVectorsSuccess (state, payload) {
      state.filteredVectors = payload.vectors.results
      state.totalResults = payload.vectors.count
      state.paginationArray = Array.from(Array(Math.ceil(payload.vectors.count / payload.pageSize)).keys())
    },
    getVectorsByTagSuccess (state, payload) {
      state.filteredVectors = payload.vectors.results
      state.totalResults = payload.vectors.count
      state.paginationArray = Array.from(Array(Math.ceil(payload.vectors.count / payload.pageSize)).keys())
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
    },
    getFeaturedVectorsSuccess (state, vectors) {
      state.featuredVectors = vectors
    }
  },
  actions: {
    getTags ({ commit }) {
      appService.getTags()
        .then(tags => {
          commit('getTagsSuccess', tags)
        })
    },
    getVectors ({ commit }, payload) {
      commit('setLoading', true)
      appService.getVectors(payload)
        .then(vectors => {
          commit('getVectorsSuccess', { vectors: vectors, pageSize: payload.pageSize })
          commit('setLoading', false)
        })
    },
    getVectorByTag ({ commit }, payload) {
      appService.getVectorByTag(payload)
        .then(vectors => {
          commit('getVectorsByTagSuccess', { vectors, tags: payload.tags, pageSize: payload.pageSize })
        })
    },
    getFeaturedVectors ({ commit }) {
      appService.getFeaturedVectors()
        .then(featuredVectors => {
          commit('getFeaturedVectorsSuccess', featuredVectors)
        })
    }
  },
  modules: {
  }
})
