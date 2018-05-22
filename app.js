const express = require('express')
const app = express()
const assert = require('assert')
var routes = require('./routes.js')
var helmet = require('helmet')
require('log-timestamp')

app.use(helmet())
app.use('/api', routes)

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Aplicación en el puerto ${PORT}`)
})
