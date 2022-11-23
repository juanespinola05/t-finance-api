import { NextFunction, Request, Response } from 'express'
import OperationService from '../services/operation.service'

const service = new OperationService()

export const postOperationController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body, user } = req
  try {
    const operation = await service.create(body, user)
    res.status(201).json({
      ok: true,
      ...operation
    })
  } catch (error) {
    next(error)
  }
}

export const getOperationsByMonthController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { month } = req.params
  const { type } = req.query
  const { user } = req
  try {
    const operations = await service.findByMonth(user, +month, type as string)
    res.status(200).json({
      length: operations.length,
      data: operations
    })
  } catch (error) {
    next(error)
  }
}

export const getOperationController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req
  const { id } = req.params
  try {
    const operation = await service.get(+id, user)
    res.status(200).json({
      ok: true,
      data: operation
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOperationController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { user } = req
  try {
    await service.delete(id, user)
    res.status(200).json({ ok: true })
  } catch (error) {
    next(error)
  }
}
