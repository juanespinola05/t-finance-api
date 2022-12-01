import { NextFunction, Request, Response } from 'express'
import { Limit } from '../db/models/limit.model'
import LimitService from '../services/limit.service'

const service = new LimitService(Limit)

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

export const getLimitController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user: { id } } = req
  try {
    const limit = await service.findOne({ where: { id } })
    res.status(200).json(limit)
  } catch (error) {
    next(error)
  }
}

export const getLimitStateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user: { id } } = req
  try {
    const state = await service.getState(+id)
    res.status(200).json({ ok: true, state })
  } catch (error) {
    next(error)
  }
}
