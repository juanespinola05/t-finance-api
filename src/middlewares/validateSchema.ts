import boom from '@hapi/boom'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ObjectSchema } from 'joi'

const validateSchema = (schema: ObjectSchema, field: string = 'body'): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[field as keyof Request], { abortEarly: false })
    if (error != null) {
      const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
      const details = error.details.map(detail => detail.message)
      const message = formatter.format(details)
      throw boom.badRequest(message)
    }
    next()
  }
}
export default validateSchema
