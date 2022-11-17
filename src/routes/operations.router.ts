/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'
import {
  postOperationController,
  getOperationsByMonthController
} from '../controllers/operations.controller'
import attachUser from '../middlewares/attachUser'
import validateJWT from '../middlewares/validateJWT'
import validateSchema from '../middlewares/validateSchema'
import { postOperation, getOperationsByMonth, typeQueryParam } from '../schemas/operation.schema'
const router: Router = express.Router()

router.post('/', validateJWT, validateSchema(postOperation), attachUser, postOperationController)
router.get('/month/:month', validateJWT, validateSchema(getOperationsByMonth), validateSchema(typeQueryParam), attachUser, getOperationsByMonthController)

export default router
