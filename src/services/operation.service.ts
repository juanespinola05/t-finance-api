import boom from '@hapi/boom'
import { Op, WhereOptions } from 'sequelize'
import { OperationCreationAttributes, OperationOutput, User } from '../../types'
import { SERVER_UNAVAILABLE } from '../constants/messages'
import { months, monthNames } from '../constants/months'
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

  async findByMonth (user: User, month: number, type: string): Promise<OperationOutput[]> {
    const currentYear = new Date().getFullYear()
    const monthToUse = months[month]
    const monthName = monthNames[month]
    const fromDate = new Date(`${monthName} 01, ${currentYear} 00:00:00`)
    const toDate = new Date(`${monthName} ${monthToUse}, ${currentYear} 23:59:59`)

    const whereOptions: WhereOptions = {
      userId: user.id,
      date: {
        [Op.lt]: toDate,
        [Op.gt]: fromDate
      }
    }

    if (['outflow', 'income'].includes(type)) {
      whereOptions.type = type
    }

    const operations = await sequelize.models.Operation.findAll({
      where: whereOptions
    })
    return operations.map(({ dataValues: { id, concept, amount, type, date, createdAt } }) => ({
      id,
      concept,
      amount,
      type,
      date,
      createdAt
    }))
  }
}
