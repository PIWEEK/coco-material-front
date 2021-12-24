import appService from '@/service/app.service.js'

const state = () => ({
  totalResults: null,
  featuredVectors: null,
  latestVectors: null
})

const mutations = {
  getFeaturedVectorsSuccess (state, vectors) {
    state.featuredVectors = vectors
  },
  getLatestVectorsSuccess (state, vectors) {
    state.latestVectors = vectors
  }
}

const actions = {
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
}

const homeStoreModule = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default homeStoreModule
