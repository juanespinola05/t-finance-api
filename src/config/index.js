require('dotenv').config()

module.exports = {
  PORT: process.env.APP_PORT,
  ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL
}
