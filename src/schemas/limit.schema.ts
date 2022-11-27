import Joi from 'joi'

export const postLimit = Joi.object({
  amount: Joi.number().min(1).required()
})
