import { Boom } from '@hapi/boom'
import { Request, Response, NextFunction } from 'express'

const handleBoomError = (error: Boom, _req: Request, res: Response, next: NextFunction): void => {
  if (error.isBoom) {
    const { output } = error
    res.status(output.statusCode).json(output.payload)
  } else {
    next(error)
  }
}

export default handleBoomError
