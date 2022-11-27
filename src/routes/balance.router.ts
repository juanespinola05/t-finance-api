/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
// import attachUser from '../middlewares/attachUser'
// import validateJWT from '../middlewares/validateJWT'
import { getBalanceController } from '../controllers/balance.controller'
import attachUser from '../middlewares/attachUser'
import validateJWT from '../middlewares/validateJWT'
import validateSchema from '../middlewares/validateSchema'
import { getBalanceSchema } from '../schemas/balance.schema'

const router = express.Router()

router.get('/', validateJWT, validateSchema(getBalanceSchema, 'query'), attachUser, getBalanceController)

export default router
