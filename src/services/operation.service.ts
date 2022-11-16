import boom from '@hapi/boom'
import { OperationCreationAttributes, User } from '../../types'
import { SERVER_UNAVAILABLE } from '../constants/messages'
import { Operation } from '../db/models/operation.model'
import sequelize from '../lib/sequelize'

export default class OperationService {
  async create (data: OperationCreationAttributes, user: User): Promise<Operation> {
    const transaction = await sequelize.transaction()
    let category: any
    if (data.type === 'outflow') {
      category = await sequelize.models.Category.findOne({
        transaction,
        where: {
          tagname: data.category
        }
      })
    }
    if (category === null) throw boom.notFound('Category not found')
    const operation = await sequelize.models.Operation.create({
      ...data,
      userId: user.id
    }, { transaction })
    await category.addOperation(operation as Operation, { transaction })
    try {
      await transaction.commit()
      return operation.dataValues as Operation
    } catch (error) {
      await transaction.rollback()
      throw boom.serverUnavailable(SERVER_UNAVAILABLE)
    }
  }
}
