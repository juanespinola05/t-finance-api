import { LimitAttributes } from '../../types'
import { User } from '../db/models/user.model'
import sequelize from '../lib/sequelize'

export default class LimitService {
  async upsert (data: LimitAttributes, user: User): Promise<boolean> {
    const limit = await sequelize.models.Limit.upsert({
      ...data,
      userId: user.id,
      raw: true
    })

    return limit[1] !== null
  }
}
