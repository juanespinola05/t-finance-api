import boom from '@hapi/boom'
import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'

const validateSchema = (schema: Schema, field: string = 'body'): Function => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[field as keyof Request])
    if (error != null) {
      // TODO: return schema errors
      throw boom.badRequest('Not valid schema xd')
    }
    next()
  }
}
export default validateSchema
