const util = {
  packPrams(data, separator = '&') {
    if (Object.prototype.toString.call(data) !== '[object Object]') return ''
    const params = []
    Object.keys(data).forEach(key => {
      params.push(
        key + '=' + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key])
      )
    })
    return params.join(separator)
  },
}

module.exports = util
