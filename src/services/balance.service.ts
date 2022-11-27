import { Op } from 'sequelize'
import { BalanceRange } from '../../types'
import { User } from '../db/models/user.model'
import generateDates from '../helpers/generateDates'
import sequelize from '../lib/sequelize'

const { models } = sequelize
export default class BalanceService {
  async get (range: BalanceRange = BalanceRange.THIS_MONTH, user: User): Promise<number> {
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
