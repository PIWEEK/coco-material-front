import axios from 'axios'

axios.defaults.baseURL = 'https://cocomaterial.com/api'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'

const appService = {
  getVectors (payload) {
    return new Promise((resolve) => {
      axios.get(`/vectors/?page=${payload.currentPage}&page_size=${payload.pageSize}`).then(response => {
        resolve(response.data)
      })
    })
  },
  getVectorByTag (payload) {
    return new Promise((resolve) => {
      axios.get(`/vectors/?tags=${payload.tags.join()}&page=${payload.currentPage}&page_size=${payload.pageSize}`).then(response => {
        resolve(response.data)
      })
    })
  },
  getTags () {
    return new Promise((resolve) => {
      axios.get('/tags/').then(response => {
        resolve(response.data)
      })
    })
  }
}
export default appService
