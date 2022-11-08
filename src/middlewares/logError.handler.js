const { ENV } = require('../config')

const logErrors = (err, req, res, next) => {
  if (ENV === 'development') console.error(err)
  next(err)
}

module.exports = logErrors
