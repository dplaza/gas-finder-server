var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var cors = require('cors')

var sendBody = require('./middlewares/sendBody')
var api = require('./middlewares/api')

// Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({
  extended: false
}))
router.use(bodyParser.json())

router.use(cors())
router.options('*', cors()) // include before other routes

// ------------------------- Rutas ---------------------------------------------------

router.post('/getByRegion', api.getByRegion, sendBody)

module.exports = router
