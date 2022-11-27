import boom from '@hapi/boom'
import { FindOptions, Model, Op, WhereOptions } from 'sequelize'
import { BalanceRange, OperationCreationAttributes, OperationOutput, OperationType, OperationUpdateInput, User } from '../../types'
import { SERVER_UNAVAILABLE } from '../constants/messages'
import { months, monthNames } from '../constants/months'
import { Operation } from '../db/models/operation.model'
import generateDates from '../helpers/generateDates'
import sequelize from '../lib/sequelize'

const { models } = sequelize
export default class OperationService {
  async create (data: OperationCreationAttributes, user: User): Promise<Operation> {
    const isOutflow = data.type === OperationType.OUTFLOW
    const transaction = await sequelize.transaction()
    let category: any
    if (isOutflow) {
      category = await models.Category.findOne({
        transaction,
        where: {
          tagname: data.category
        }
      })
      if (category === null) throw boom.notFound('Category not found')
    }
    const operation = await models.Operation.create({
      ...data,
      userId: user.id
    }, { transaction })

    isOutflow && await category.addOperation(operation as Operation, { transaction })

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

    const operations = await models.Operation.findAll({
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
    const operation = await this.findOne(operationId, user, {
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
    await models.Operation.destroy({
      where: {
        id,
        userId: user.id
      }
    })
  }

  async findOne (operationId: number, user?: User, options: FindOptions = {}): Promise<Model<Operation> | null> {
    options.where = {
      id: operationId
    }
    if (user !== undefined) {
      options.where.userId = user.id
    }
    const operation = await models.Operation.findOne(options)
    return operation
  }

  async update (operationId: number, user: User, data: OperationUpdateInput): Promise<boolean> {
    const operation = await this.findOne(operationId, user)
    if (operation == null) {
      throw boom.notFound('Operation not found')
    }
    if (data.type === OperationType.INCOME) {
      data.categoryId = null
    }
    const affectedRows = await models.Operation.update(data, {
      where: {
        id: operationId
      }
    })
    return affectedRows[0] !== 0
  }

  async getBalance (range: BalanceRange = BalanceRange.THIS_MONTH, user: User): Promise<number> {
    const { from, to } = generateDates(range)

    // TODO: return something different if there are no operations to make balance cuac

    const balance = await models.Operation.sum('amount', {
      where: {
        userId: user.id,
        date: {
          [Op.gte]: from,
          [Op.lte]: to
        }
      }
    })
    return balance
  }
}
