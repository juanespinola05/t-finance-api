import boom from '@hapi/boom'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ObjectSchema } from 'joi'

const validateSchema = (schema: ObjectSchema, field: string = 'body'): RequestHandler => {
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
