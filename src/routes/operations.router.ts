/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'
import { postOperationController } from '../controllers/operations.controller'
import validateJWT from '../middlewares/validateJWT'
import validateSchema from '../middlewares/validateSchema'
import { postOperation } from '../schemas/operation.schema'
export const router: Router = express.Router()

router.post('/', validateJWT, validateSchema(postOperation), postOperationController)
