import boom from '@hapi/boom'
import { Op, WhereOptions } from 'sequelize'
import { BalanceRange, PrimaryKey } from '../../types'
import { NO_LIMIT_CREATED } from '../constants/messages'
import { Operation } from '../db/models/operation.model'
import { User } from '../db/models/user.model'
import generateDates from '../helpers/generateDates'
import sequelize from '../lib/sequelize'
import { LimitAttributes } from '../types/limit.model'
import BaseService from '../utils/BaseService'
import OperationService from './operation.service'
const { models } = sequelize
const { Limit } = models

const operationService = new OperationService(Operation)
export default class LimitService extends BaseService<typeof Limit> {
  async upsert (data: LimitAttributes, user: User): Promise<boolean> {
    const limit = await sequelize.models.Limit.upsert({
      ...data,
      userId: user.id,
      raw: true
    })

    return limit[1] !== null
  }

  async getState (id: PrimaryKey): Promise<any> {
    const limit = await this.findOne({ attributes: ['amount'], where: { userId: id } })
    if (limit === null) {
      throw boom.notFound(NO_LIMIT_CREATED)
    }
    const { from, to } = generateDates(BalanceRange.THIS_MONTH)

    const options: WhereOptions = {
      userId: id,
      date: {
        [Op.gte]: from,
        [Op.lte]: to
      }
    }
    const outflowBalance = await operationService.getOutflowBalance(options)
    return {
      limit,
      outflowBalance: outflowBalance ?? 0
    }
  }
}
