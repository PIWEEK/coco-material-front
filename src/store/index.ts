import Vue from 'vue'
import Vuex from 'vuex'
import appService from '@/service/app.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    filteredVectors: [],
    searchTags: [],
    loading: false,
    totalResults: null,
    paginationArray: [],
    featuredVectors: null,
    latestVectors: null
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
    getVectorsByTagsSuccess (state, payload) {
      state.filteredVectors = payload.vectors.results
      state.totalResults = payload.vectors.count
      state.paginationArray = Array.from(Array(Math.ceil(payload.vectors.count / payload.pageSize)).keys())
      state.searchTags = payload.tags
    },
    clearVectors (state) {
      state.filteredVectors = []
      state.totalResults = null
      state.paginationArray = []
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
    },
    getLatestVectorsSuccess (state, vectors) {
      state.latestVectors = vectors
    }
  },
  actions: {
    getTags ({ commit }) {
      return appService.getTags()
        .then(tags => {
          commit('getTagsSuccess', tags)
        })
    },
    getVectors ({ commit }, payload) {
      commit('clearVectors')
      commit('setLoading', true)
      return appService.getVectors(payload)
        .then(vectors => {
          commit('getVectorsSuccess', { vectors: vectors, pageSize: payload.pageSize })
          commit('setLoading', false)
        })
    },
    getVectorsByTags ({ commit }, payload) {
      commit('clearVectors')
      commit('setLoading', true)
      return appService.getVectorsByTags(payload)
        .then(vectors => {
          commit('getVectorsByTagsSuccess', { vectors, tags: payload.tags, pageSize: payload.pageSize })
          commit('setLoading', false)
        })
    },
    getFeaturedVectors ({ commit }) {
      return appService.getFeaturedVectors()
        .then(featuredVectors => {
          commit('getFeaturedVectorsSuccess', featuredVectors)
        })
    },
    getLatestVectors ({ commit }) {
      return appService.getLatestVectors()
        .then(latestVectors => {
          commit('getLatestVectorsSuccess', latestVectors)
        })
    }
  },
  modules: {}
})
