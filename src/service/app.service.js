import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'

const appService = {
  // Vectors
  getVectors (payload) {
    return axios.get(`/vectors/?page=${payload.currentPage}&page_size=${payload.pageSize}`).then(response => {
      return response.data
    })
  },
  getVectorByTag (payload) {
    return axios.get(`/vectors/?tags=${payload.tags.join()}&page=${payload.currentPage}&page_size=${payload.pageSize}`).then(response => {
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
  // Tags
  getTags () {
    return axios.get('/tags/').then(response => {
      return response.data
    })
  }
}
export default appService
