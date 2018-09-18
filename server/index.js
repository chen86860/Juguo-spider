const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const Juguo = require('./model/Juguo')

router.get('/', async (context, next) => {
  let res = {
    code: 200,
    data: null,
  }
  try {
    const list = await Juguo.find(
      {},
      {
        id: 1,
        'data.id': 1,
        'data.price': 1,
      }
    )
    res.data = list
  } catch (error) {
    res = {
      code: 400,
      message: error || 'Fetch Data error',
    }
  }

  context.set('Access-Control-Allow-Origin', '*')
  context.body = JSON.stringify(res)
  next()
})
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3001)
console.log('server is listen at port:', 3001)
