import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'

const api = {
  // Vectors
  getVector (payload) {
    return axios.get(`/vectors/${payload.id}`).then(response => {
      return response.data
    })
  },
  getVectors (payload) {
    const queryUrl = new URLSearchParams()
    queryUrl.set('page', payload.currentPage)
    queryUrl.set('page_size', payload.pageSize)
    if (payload.tags && payload.tags.length > 0) {
      queryUrl.set('tags', payload.tags.join())
    }
    if (payload.ordering) {
      queryUrl.set('ordering', payload.ordering)
    }

    return axios.get(`/vectors/?${queryUrl.toString()}`).then(response => {
      return response.data
    })
  },
  getFeaturedVectors () {
    return axios.get('/vectors/featured/').then(response => {
      return response.data
    })
  },
  getLatestVectors () {
    return axios.get('/vectors/latest/').then(response => {
      return response.data
    })
  },
  getTotalVectors () {
    return axios.get('/vectors/total/').then(response => {
      return response.data
    })
  },
  // Tags
  getTags () {
    return axios.get('/tags/').then(response => {
      return response.data
    })
  },
  // Sugestion
  sendSuggestion (form) {
    return axios.post('/suggestion/', form).then(response => {
      return response.data
    })
  }
}
export default api
