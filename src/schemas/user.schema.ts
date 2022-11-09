import Joi, { ObjectSchema } from 'joi'

export const registerSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
