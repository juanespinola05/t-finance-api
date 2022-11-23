import boom from '@hapi/boom'
import { Op, WhereOptions } from 'sequelize'
import { OperationCreationAttributes, OperationOutput, OperationType, User } from '../../types'
import { SERVER_UNAVAILABLE } from '../constants/messages'
import { months, monthNames } from '../constants/months'
import { Operation } from '../db/models/operation.model'
import sequelize from '../lib/sequelize'

export default class OperationService {
  async create (data: OperationCreationAttributes, user: User): Promise<Operation> {
    const transaction = await sequelize.transaction()
    let category: any
    if (data.type === OperationType.OUTFLOW) {
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

  async get (operationId: number, user: User): Promise<OperationOutput> {
    const operation = await sequelize.models.Operation.findOne({
      where: {
        id: operationId,
        userId: user.id
      },
      include: ['category'] // todo return category as well
    })
    if (operation === null) {
      throw boom.notFound('Operation not found')
    }
    const {
      dataValues: {
        id,
        concept,
        amount,
        type,
        date,
        createdAt
      }
    } = operation

    return {
      id,
      concept,
      amount,
      type,
      date,
      createdAt
    }
  }

  async delete (id: string, user: User): Promise<void> {
    await sequelize.models.Operation.destroy({
      where: {
        id,
        userId: user.id
      }
    })
  }
}
