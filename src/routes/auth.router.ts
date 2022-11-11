/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'
import { loginController, registerController } from '../controllers/auth.controller'
import validateSchema from '../middlewares/validateSchema'
import { loginSchema, registerSchema } from '../schemas/user.schema'

const router: Router = express.Router()

router.post('/register', validateSchema(registerSchema, 'body'), registerController)
router.post('/login', validateSchema(loginSchema, 'body'), loginController)

export default router
