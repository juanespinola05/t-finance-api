import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { PORT } from './config'
import logError from './middlewares/logError.handler'
import handleSQLError from './middlewares/SQLError.handler'
import handleBoomError from './middlewares/boomError.handler'
import handleError from './middlewares/error.handler'

const app: Application = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (_req: Request, res: Response) => {
  res.send('T-Finanance API')
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

app.use(logError)
app.use(handleSQLError)
app.use(handleBoomError)
// TODO: not retrieve this in prod
app.use(handleError)

module.exports = app
