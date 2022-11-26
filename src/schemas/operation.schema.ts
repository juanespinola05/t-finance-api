import Joi from 'joi'

const concept = Joi.string().min(1)
const amount = Joi.number()
const type = Joi.string().pattern(/income|outflow/mi)
const date = Joi.date()

export const postOperation = Joi.object({
  concept: concept.required(),
  amount: amount.required(),
  type: type.required(),
  category: Joi.string().required(),
  date: date.required()
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

export const updateOperation = Joi.object({
  concept,
  amount,
  type,
  date
})
