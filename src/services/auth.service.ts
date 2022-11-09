import boom from '@hapi/boom'
import sequelize from '../lib/sequelize'
import { UserCreationAttributes } from '../../types'
import { EMAIL_EXISTS } from '../constants/messages'

export default class AuthService {
  async register (data: UserCreationAttributes): Promise<{}> {
    console.log(sequelize.models)
    const user = await sequelize.models.User.findOne({ where: { email: data.email } })
    if (user !== null) {
      throw boom.badRequest(EMAIL_EXISTS)
    }

    await sequelize.models.User.create(data)
    return {
      ok: true
    }
  }
}
