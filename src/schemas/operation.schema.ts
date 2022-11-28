import Joi, { CustomHelpers, CustomValidator } from 'joi'
import { OperationType } from '../types/operation.model'
import { INCOME_REQUIREMENTS, OUTFLOW_REQUIREMENTS } from '../constants/messages'

const concept = Joi.string().min(1)
const amount = Joi.number()
const type = Joi.string().pattern(/income|outflow/mi)
const date = Joi.date()

export const postOperation = Joi.object({
  concept: concept.required(),
  amount: amount.required(),
  type: type.required(),
  category: Joi.string(),
  date: date.required()
})

const method: CustomValidator = (data, _helpers: CustomHelpers) => {
  const validOutflowOperation =
    data?.type === OperationType.OUTFLOW &&
    (data?.amount >= 0 || data?.category === undefined)

  if (validOutflowOperation) {
    throw new Error(OUTFLOW_REQUIREMENTS)
  }

  const validIncomeOperation = data?.type === OperationType.INCOME && data?.amount <= 0

  if (validIncomeOperation) {
    throw new Error(INCOME_REQUIREMENTS)
  }

  return data
}

export const postOperationFields = Joi.object().custom(method, 'Custom validation')

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

export const getBalanceSchema = Joi.object({
  range: Joi.string().pattern(/lastmonth|thismonth|lastweek/mi)
})
