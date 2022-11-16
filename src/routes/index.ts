import express, { Application, Router } from 'express'
import authRouter from './auth.router'
import operationRouter from './operations.router'

const router: Router = express.Router()

export default function setupRoutes (app: Application): void {
  app.use('/api', router)
  router.use('/auth', authRouter)
  router.use('/operations', operationRouter)
}
