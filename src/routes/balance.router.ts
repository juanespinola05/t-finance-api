import express from 'express'
// import attachUser from '../middlewares/attachUser'
// import validateJWT from '../middlewares/validateJWT'
import { getBalanceController } from '../controllers/balance.controller'

const router = express.Router()

router.get('/', getBalanceController)

export default router
