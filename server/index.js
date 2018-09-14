const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const Juguo = require('./model/Juguo')

router.get('/', async (context, next) => {
  const { req, res, params, query, body } = context
  const list = await Juguo.find()
  context.body = JSON.stringify(list)
  next()
})
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3001)
