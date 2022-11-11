// import fs from 'fs'
import { Sequelize } from 'sequelize'
import { User, userSchema } from './user.model'

async function setupModels (sequelize: Sequelize): Promise<void> {
  User.init(userSchema, User.config(sequelize))
}

export default setupModels
