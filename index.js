/* eslint no-process-env: 0 */
/* eslint no-console: 0 */

const port = process.env.PORT || 3000
const Koa = require('koa')
const serve = require('koa-static')
const convert = require('koa-convert')
const app = new Koa()
const use = app.use

app.use = (x) => use.call(app, convert(x))
app.use(serve('./build'))

const server = app.listen(port, () => {
  const host = server.address().address

  console.log('listening at http://%s:%s', host, port)
})
