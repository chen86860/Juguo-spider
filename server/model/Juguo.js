const mongo = require('./../mongo').connection()

const Juguo = mongo.model('juguo', {
  id: Number,
  createDate: Date,
  data: [
    {
      id: String,
      link: String,
      tag: String,
      minimap: String,
      title: String,
      position: String,
      price: String,
      price: String,
      fullPrice: String,
      updateDate: Date,
    },
  ],
})

module.exports = Juguo
