import express, { Router } from 'express'
import { registerController } from '../controllers/auth.controller'
import validateSchema from '../middlewares/validateSchema'
import { registerSchema } from '../schemas/user.schema'

const router: Router = express.Router()

router.post('/register', validateSchema(registerSchema, 'body'), registerController)

export default router
