const mongoose = require('mongoose')
const config = require('./../../config/index').mongo

module.exports = () => {
  mongoose.connect(
    `${config.host}/${config.db}`,
    {
      useNewUrlParser: true,
    }
  )

  return mongoose
}
