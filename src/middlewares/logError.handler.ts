import { Request, Response, NextFunction } from 'express'
import { ENV } from '../config'

const logErrors = (error: Error, _req: Request, _res: Response, next: NextFunction): void => {
  if (ENV === 'development') console.error(error)
  next(error)
}

export default logErrors
