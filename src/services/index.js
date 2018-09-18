const http = require('./../base/http')
import API from './api'

const fetchList = () => {
  return new Promise(resolve => {
    http.get(API.list).then(res => resolve(res))
  })
}

export { fetchList }
