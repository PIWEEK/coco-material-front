import appService from '@/service/app.service.js'

const state = () => ({
  filteredVectors: [],
  paginationArray: [],
  totalResults: null,
  loading: false
})

const mutations = {
  getVectorsSuccess (state, payload) {
    state.filteredVectors = payload.vectors.results
    state.totalResults = payload.vectors.count
    state.paginationArray = Array.from(Array(Math.ceil(payload.vectors.count / payload.pageSize)).keys())
  },
  clearVectors (state) {
    state.filteredVectors = []
    state.totalResults = null
    state.paginationArray = []
  },
  clearFilteredVectors (state) {
    state.filteredVectors = []
  },
  setLoading (state, activate) {
    state.loading = activate
  }
}

const actions = {
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
        commit('tags/setSearchTags', payload.tags, { root: true })
        commit('getVectorsSuccess', { vectors, pageSize: payload.pageSize })
        commit('setLoading', false)
      })
  }
}

const resultsStoreModule = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default resultsStoreModule
