const express = require('express')
const cors = require('cors')
const { PORT } = require('./config')

const app = express()
app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send('T-Finanance API')
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

module.exports = app
