const cheerio = require('cheerio')
const Juguo = require('./../model/Juguo')
const util = require('./../base')
const http = util.http

let $ = null
const init = () => {
  http.get('http://www.juguoroom.com/app.php?m=product').then(res => {
    if (res.status !== 200) return
    $ = cheerio.load(res.data)
    const temList = $('.product-list').find('li>a')

    let parseList = []
    temList.each((index, item) => {
      parseList.push(parseData(item))
    })
    const juguo = new Juguo({
      id: Date.now(),
      createDate: Date.now(),
      data: parseList,
    })
    juguo
      .save()
      .then(() => {
        console.log('saved!')
        process.exit()
      })
      .catch(err => {
        console.log('err', err)
        process.exit()
      })
  })
}

const parseData = dom => {
  const that = $(dom)
  const idArr = that.attr('href').match(/id=(\d+)/i)
  const data = {
    id: idArr && idArr.length > 1 ? idArr[1] : '',
    link: that.attr('href'),
    tag: that.find('ins').text(),
    minimap: that.find('.pic img').attr('src'),
    title: that.find('h3').text(),
    position: that.find('h3+p').text(),
    price: that.find('.price span').text(),
    fullPrice: that.find('.price').text(),
  }
  return data
}
init()
