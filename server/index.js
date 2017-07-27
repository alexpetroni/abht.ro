const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const api = require('./api')


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, './../uploads')))

app.use('/dist', express.static(resolve('../dist')))

app.use('/api', api)

app.get('/', function(req, res){
  const homePage = fs.readFileSync(resolve('./../'+ 'index.html'), 'utf-8')
  res.send(homePage)
})

function errorHandler (err, req, res, next) {
  console.log('errorHandler send 500 ')
  console.log(err.message)
  res.status(500)
  res.send('error from errorHandler ' + err.message)
}

app.use(errorHandler)

const port = 3030

app.listen(port, function(){
  console.log('server start on '+port)
})
