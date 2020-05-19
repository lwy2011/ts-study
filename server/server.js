
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const express = require('express')
const app = express()
const compiler = webpack(webpackConfig)
const bodyParser = require('body-parser')
app.use(webpackDevMiddleware(compiler,{
  publicPath:'/__build__/',
  stats:{
    colors:true,
    chunks:false
  }
}))

app.use(webpackDevMiddleware(compiler))
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const router = express.Router()
router.get('/simple/get',(req,res)=>{
  res.json({
    msg:'hello!!'
  })
})
router.get('/base/get',(req,res)=>{
  res.json({
    msg:'base - params!!'
  })
})
app.use(router)

const port  = process.env.PORT || 8081

module.exports = app.listen(port,()=>{
  console.log(`${port} listening`);
})
