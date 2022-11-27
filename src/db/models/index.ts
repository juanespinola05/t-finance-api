// import fs from 'fs'
import { Sequelize } from 'sequelize'
import { User, userSchema } from './user.model'
import { Operation, operationSchema } from './operation.model'
import { Category, categorySchema } from './category.model'
import { Limit, limitSchema } from './limit.model'

async function setupModels (sequelize: Sequelize): Promise<void> {
  User.init(userSchema, User.config(sequelize))
  Operation.init(operationSchema, Operation.config(sequelize))
  Category.init(categorySchema, Category.config(sequelize))
  Limit.init(limitSchema, Limit.config(sequelize))

  User.associate(sequelize)
  Operation.associate(sequelize)
  Category.associate(sequelize)
  Limit.associate(sequelize)
}

export default setupModels
