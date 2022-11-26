import { Options, Sequelize } from 'sequelize'
import { DB_URL, ENV } from '../config/'
import setupModels from '../db/models'

const isProduction: boolean = ENV === 'production'

const config: Options = {
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

const sequelize: Sequelize = new Sequelize(DB_URL, config)

void setupModels(sequelize)

export default sequelize
