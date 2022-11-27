/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'
import {
  postOperationController,
  getOperationsByMonthController,
  getOperationController,
  deleteOperationController,
  updateOperationController,
  getBalanceController,
  getGeneralBalanceController
} from '../controllers/operations.controller'
import attachUser from '../middlewares/attachUser'
import validateJWT from '../middlewares/validateJWT'
import validateSchema from '../middlewares/validateSchema'
import {
  postOperation,
  getOperationsByMonth,
  typeQueryParam,
  getOperation,
  updateOperation,
  postOperationFields,
  getBalanceSchema
} from '../schemas/operation.schema'
const router: Router = express.Router()

router.post('/', validateJWT, validateSchema(postOperation), validateSchema(postOperationFields), attachUser, postOperationController)
router.get('/balance', validateJWT, validateSchema(getBalanceSchema, 'query'), attachUser, getBalanceController)
router.get('/balance/general', validateJWT, attachUser, getGeneralBalanceController)
router.get('/month/:month', validateJWT, validateSchema(getOperationsByMonth), validateSchema(typeQueryParam, 'query'), attachUser, getOperationsByMonthController)
router.get('/:id', validateJWT, validateSchema(getOperation, 'params'), attachUser, getOperationController)
router.delete('/:id', validateJWT, validateSchema(getOperation, 'params'), attachUser, deleteOperationController)
router.patch('/:id', validateJWT, validateSchema(getOperation, 'params'), validateSchema(updateOperation), attachUser, updateOperationController)

export default router
