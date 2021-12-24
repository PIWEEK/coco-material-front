import appService from '@/service/app.service.js'

const state = () => ({
  tags: [],
  searchTags: []
})

const mutations = {
  getTagsSuccess (state, tags) {
    state.tags = tags
  },
  setSearchTags (state, tags) {
    state.searchTags = tags ? [...tags] : []
  },
  clearSearchTags (state) {
    state.searchTags = []
  },
  updateSearchTags (state, tag) {
    state.searchTags.push(tag)
  },
  removeSearchTag (state, tag) {
    const index = state.searchTags.findIndex(it => it === tag)
    state.searchTags.splice(index, 1)
  }
}

const actions = {
  getTags ({ commit }) {
    return appService.getTags()
      .then(tags => {
        commit('getTagsSuccess', tags)
      })
  }
}

const tagsStoreModule = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default tagsStoreModule
