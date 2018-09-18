const axios = require('axios')
const util = require('./../util')

class Http {
  constructor() {
    this.v = '1.0'
    this.ajax = this.ajax.bind(this)
  }

  ajax(params) {
    return new Promise((resolve, reject) => {
      let opts = {
        method: 'GET',
        url: '',
        timeout: 100000,
      }
      opts.method = (params.method && params.method.toUpperCase()) || 'GET'
      opts.url = params.url || ''
      if (typeof opts.url !== 'string' || opts.url === '')
        return reject(new Error('Url is required'))
      if (opts.method === 'GET') {
        opts.url += (opts.url.indexOf('?') === -1 ? '?' : '&') + util.packPrams(params.data)
      }
      if (opts.method === 'POST') {
        opts.body = params.data
      }
      axios(opts)
        .then(res => {
          const resp = res.data
          if (resp.code && resp.code === 200) {
            resolve(resp)
          } else {
            reject(resp)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  get(url, opts) {
    return new Promise((resolve, reject) => {
      this.ajax({
        method: 'GET',
        url,
        ...opts,
      }).then(res => {
        resolve(res)
      })
    })
  }
  post(url, data, opts) {
    return new Promise((resolve, reject) => {
      this.ajax({
        method: 'GET',
        url,
        data,
        ...opts,
      }).then(res => {
        resolve(res)
      })
    })
  }
}

module.exports = new Http()
