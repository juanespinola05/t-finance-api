import { NextFunction, Request, Response } from 'express'
import { BalanceRange } from '../../types'
import BalanceService from '../services/balance.service'

const service = new BalanceService()

export const getBalanceController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { range } = req.query
  const { user } = req
  try {
    const balance = await service.get(range as BalanceRange, user)
    res.status(200).json({ balance })
  } catch (error) {
    next(error)
  }
}