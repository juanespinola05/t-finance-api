import boom from '@hapi/boom'
import { Op, WhereOptions } from 'sequelize'
import { BalanceRange, Period } from '../../types'
import { Balance, CreateOperationDto, OperationOutputBase, OperationType, OperationUpdateInput } from '../types/operation.model'
import { Operation } from '../db/models/operation.model'
import { SERVER_UNAVAILABLE } from '../constants/messages'
import { months, monthNames } from '../constants/months'
import generateDates from '../helpers/generateDates'
import sequelize from '../lib/sequelize'
import { UserAttributes } from '../types/user.model'
import BaseService from '../utils/BaseService'

const { models: { Operation: OperationCtor, Category } } = sequelize
export default class OperationService extends BaseService<typeof OperationCtor> {
  async create (data: CreateOperationDto, user: UserAttributes): Promise<Operation> {
    const isOutflow = data.type === OperationType.OUTFLOW
    const transaction = await sequelize.transaction()
    let category: any
    if (isOutflow) {
      category = await Category.findOne({
        transaction,
        where: {
          tagname: data.category
        }
      })
      if (category === null) throw boom.notFound('Category not found')
    }
    const operation = await OperationCtor.create({
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

  async findByMonth (user: UserAttributes, month: number, type: string): Promise<OperationOutputBase[]> {
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

    const operations = await OperationCtor.findAll({
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

  async get (operationId: number, user: UserAttributes): Promise<OperationOutputBase> {
    const operation = await this.findOne({
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

  async delete (id: string, user: UserAttributes): Promise<void> {
    await OperationCtor.destroy({
      where: {
        id,
        userId: user.id
      }
    })
  }

  async update (operationId: number, user: UserAttributes, data: OperationUpdateInput): Promise<boolean> {
    const operation = await this.findOne({ where: { id: operationId, userId: user.id } })
    if (operation == null) {
      throw boom.notFound('Operation not found')
    }
    if (data.type === OperationType.INCOME) {
      data.categoryId = null
    }
    const affectedRows = await OperationCtor.update(data, {
      where: {
        id: operationId
      }
    })
    return affectedRows[0] !== 0
  }

  async getIncomeBalance (options: WhereOptions): Promise<number> {
    return await OperationCtor.sum('amount', {
      where: {
        ...options,
        type: OperationType.INCOME
      }
    })
  }

  async getOutflowBalance (options: WhereOptions): Promise<number> {
    return await OperationCtor.sum('amount', {
      where: {
        ...options,
        type: OperationType.OUTFLOW
      }
    })
  }

  getBalances (range: BalanceRange, user: UserAttributes): Promise<Balance>
  getBalances (period: Period, user: UserAttributes): Promise<Balance>

  async getBalances (period: BalanceRange | Period, user: UserAttributes): Promise<Balance> {
    let date

    if (typeof period === 'string') {
      date = generateDates(period)
    } else {
      date = generateDates(period)
    }
    const { from, to } = date
    // TODO: return something different if there are no operations to make balance cuac
    console.log(date)

    const options: WhereOptions = {
      userId: user.id,
      date: {
        [Op.gte]: from,
        [Op.lte]: to
      }
    }
    const totalIncome = await this.getIncomeBalance(options)
    const totalOutflow = await this.getOutflowBalance(options)
    console.log({ totalIncome, totalOutflow })

    return {
      income: totalIncome,
      outflow: totalOutflow
    }
  }

  async getGeneralBalance (user: UserAttributes): Promise<any> {
    const { income, outflow } = await this.getBalances(BalanceRange.THIS_MONTH, user)
    return {
      balance: income + outflow,
      income,
      outflow
    }
  }
}
