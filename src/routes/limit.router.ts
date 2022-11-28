/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { postLimitController, getLimitController } from '../controllers/limit.controller'
import attachUser from '../middlewares/attachUser'
import validateJWT from '../middlewares/validateJWT'
import validateSchema from '../middlewares/validateSchema'
import { postLimit } from '../schemas/limit.schema'

const router = express.Router()

router.post('/', validateJWT, validateSchema(postLimit), attachUser, postLimitController)
router.get('/', validateJWT, attachUser, getLimitController)

export default router
