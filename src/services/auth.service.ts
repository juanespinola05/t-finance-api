import boom from '@hapi/boom'
import sequelize from '../lib/sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CreateUserDto, LoginUserDto } from '../types/user.model'
import { EMAIL_EXISTS, INVALID_FIELDS } from '../constants/messages'
import { JWT_SECRET } from '../config'
import { ReturnedToken } from '../types/auth.model'
// import model from '../db/models/user.model'
export default class AuthService {
  async register (data: CreateUserDto): Promise<{}> {
    const user = await sequelize.models.User.findOne({ where: { email: data.email } })
    if (user !== null) {
      throw boom.badRequest(EMAIL_EXISTS)
    }

    await sequelize.models.User.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10)
    })
    return {
      ok: true
    }
  }

  async login (data: LoginUserDto): Promise<ReturnedToken> {
    const { email, password } = data
    const user: any = await sequelize.models.User.findOne({ where: { email } })
    if (user == null) {
      throw boom.unauthorized(INVALID_FIELDS)
    }

    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      throw boom.unauthorized(INVALID_FIELDS)
    }
    return {
      token: this.generateJWT({ email: user.email })
    }
  }

  generateJWT (payload: Object): string {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1 year' // todo: temp
    })
    return token
  }
}
