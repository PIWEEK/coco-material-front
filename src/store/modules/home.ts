import api from '@/service/api'

const state = () => ({
  totalVectors: null,
  featuredVectors: null,
  latestVectors: null
})

const mutations = {
  getTotalVectorsSuccess (state, totalVectors) {
    state.totalVectors = totalVectors
  },
  getFeaturedVectorsSuccess (state, vectors) {
    state.featuredVectors = vectors
  },
  getLatestVectorsSuccess (state, vectors) {
    state.latestVectors = vectors
  }
}

const actions = {
  getTotalVectors ({ commit }) {
    return api.getTotalVectors()
      .then(({ totalVectors }) => {
        commit('getTotalVectorsSuccess', totalVectors)
      })
  },
  getFeaturedVectors ({ commit }) {
    return api.getFeaturedVectors()
      .then(featuredVectors => {
        commit('getFeaturedVectorsSuccess', featuredVectors)
      })
  },
  getLatestVectors ({ commit }) {
    return api.getLatestVectors()
      .then(latestVectors => {
        commit('getLatestVectorsSuccess', latestVectors)
      })
  }
}

const homeStoreModule = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default homeStoreModule
