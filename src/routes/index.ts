import express, { Application, Router } from 'express'
import authRouter from './auth.router'

const router: Router = express.Router()

export default function setupRoutes (app: Application): void {
  app.use('/api', router)
  router.use('/auth', authRouter)
}
