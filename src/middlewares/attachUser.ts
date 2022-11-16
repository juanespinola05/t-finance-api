import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { INVALID_CREDENTIALS } from '../constants/messages'
import sequelize from '../lib/sequelize'

const attachUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const user = await sequelize.models.User.findOne({
    where: {
      email: req.user?.email
    }
  })
  if (user == null) next(boom.unauthorized(INVALID_CREDENTIALS))
  req.user = user?.dataValues
  next()
}

export default attachUser
