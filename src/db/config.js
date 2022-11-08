const { DB_URL } = require('../config')

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
