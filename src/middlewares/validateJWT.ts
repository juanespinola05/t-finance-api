import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import boom from '@hapi/boom'
import { INVALID_CREDENTIALS } from '../constants/messages'
import { JWT_SECRET } from '../config'

const validateJWT = (req: Request, _res: Response, next: NextFunction): void => {
  const { authorization } = req.headers
  const result = authorization?.split(' ') ?? []
  if (result[1] === undefined) {
    next(boom.unauthorized(INVALID_CREDENTIALS))
  }

  const token = result[1]

  try {
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    next(boom.unauthorized(INVALID_CREDENTIALS))
  }
}

export default validateJWT
