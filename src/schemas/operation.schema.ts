import Joi from 'joi'

export const postOperation = Joi.object({
  concept: Joi.string().min(1).required(),
  amount: Joi.date().required(),
  type: Joi.string().pattern(/income|outflow/mi).required(),
  category: Joi.string().required(),
  date: Joi.date().required()
})

export const getOperationsByMonth = Joi.object({
  month: Joi.number().min(0).max(11) // january: 0 december: 11
})

export const typeQueryParam = Joi.object({
  type: Joi.string().pattern(/income|outflow/i)
})

export const getOperation = Joi.object({
  id: Joi.number().integer().required()
})
