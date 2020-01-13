const config = require('config')
const express = require('express')
const proxy = require('express-http-proxy')
const port = process.env.PORT || 3000
const app = express()

app.use('/app', proxy(config.app.uri))
app.use(express.static(__dirname + '/dist/'))
app.get(/.*/, function(req, res) {
  res.sendfile(__dirname + '/dist/index.html')
})

app.listen(port)

console.log(`server running... [port: ${port}]`)
