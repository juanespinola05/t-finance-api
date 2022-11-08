const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { PORT } = require('./config')
const logError = require('./middlewares/logError.handler')
const handleSQLError = require('./middlewares/SQLError.handler')
const handleBoomError = require('./middlewares/boomError.handler')
const handleError = require('./middlewares/error.handler')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
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
