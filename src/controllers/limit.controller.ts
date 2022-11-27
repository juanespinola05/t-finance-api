import { NextFunction, Request, Response } from 'express'
import LimitService from '../services/limit.service'

const service = new LimitService()

export const postLimitController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user, body } = req
  try {
    const created = await service.upsert(body, user)
    const status = created ? 201 : 200
    res.status(status).json({ ok: true })
  } catch (error) {
    next(error)
  }
}
