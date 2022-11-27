import Joi from 'joi'

export const getBalanceSchema = Joi.object({
  range: Joi.string().pattern(/lastmonth|thismonth|lastweek/mi)
})
