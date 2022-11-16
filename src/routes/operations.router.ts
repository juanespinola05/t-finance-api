/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'
import { postOperationController } from '../controllers/operations.controller'
import attachUser from '../middlewares/attachUser'
import validateJWT from '../middlewares/validateJWT'
import validateSchema from '../middlewares/validateSchema'
import { postOperation } from '../schemas/operation.schema'
const router: Router = express.Router()

router.post('/', validateJWT, validateSchema(postOperation), attachUser, postOperationController)

export default router
