// import fs from 'fs'
import { Sequelize } from 'sequelize'
import { User, userSchema } from './user.model'
import { Operation, operationSchema } from './operation.model'

async function setupModels (sequelize: Sequelize): Promise<void> {
  User.init(userSchema, User.config(sequelize))
  Operation.init(operationSchema, Operation.config(sequelize))

  User.associate(sequelize)
  Operation.associate(sequelize)
}

export default setupModels
