const _ = require('lodash')

module.exports = function (req, res) {
  // Define status code
  var statusCode = 200
  if (req.method === 'POST') {
    statusCode = 201
  }

  if (_.isEmpty(req.resource)) {
    statusCode = 404
  }

  res.header('Cache-Control', 'max-age=0')

  if (res.get('content-type') === 'application/json') {
    res.status(statusCode).json(req.resource)
  } else {
    res.status(statusCode).send(req.resource)
  }
}
