import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'sequelize'

const handleSQLError = (error: Error, _req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: error.message,
      errors: error.errors
    })
  } else {
    next(error)
  }
}

export default handleSQLError
