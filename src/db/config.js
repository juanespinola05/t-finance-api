require('dotenv').config()

const DB_URL = process.env.DB_URL ?? ''

module.exports = {
  development: {
    url: DB_URL,
    dialect: 'postgres'
  },
  production: {
    url: DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
