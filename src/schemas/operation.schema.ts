import Joi from 'joi'

export const postOperation = Joi.object({
  concept: Joi.string().min(1).required(),
  amount: Joi.date().required(),
  type: Joi.string().pattern(/income|outflow/gmi).required(),
  category: Joi.string().required()
})
