const DEVHOST = '//localhost:3001'
const PRODHOST = '//116.196.110.78:3001'

// const HOST = process.env === 'development' ? DEVHOST : PRODHOST
const HOST = PRODHOST
// const HOST = DEVHOST

const API = {
  list: HOST + '/',
}

export default API
