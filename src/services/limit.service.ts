import { User } from '../db/models/user.model'
import sequelize from '../lib/sequelize'
import { LimitAttributes } from '../types/limit.model'
import BaseService from '../utils/BaseService'
const { models: { Limit } } = sequelize
export default class LimitService extends BaseService<typeof Limit> {
  async upsert (data: LimitAttributes, user: User): Promise<boolean> {
    const limit = await sequelize.models.Limit.upsert({
      ...data,
      userId: user.id,
      raw: true
    })

    return limit[1] !== null
  }
}
