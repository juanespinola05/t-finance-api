const { Sequelize } = require('sequelize')
const { DB_URL, ENV } = require('../config/')

const isProduction = ENV === 'production'

const config = {
  dialect: 'postgres',
  logging: isProduction ? false : console.log
}

if (isProduction) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(DB_URL, config)

module.exports = sequelize
