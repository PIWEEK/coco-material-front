import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'

const appService = {
  getVectors () {
    return new Promise((resolve) => {
      axios.get('/vectors/').then(response => {
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
