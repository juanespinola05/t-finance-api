const { ValidationError } = require('sequelize')

const handleSQLError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors
    })
  } else {
    next(err)
  }
}

module.exports = handleSQLError
