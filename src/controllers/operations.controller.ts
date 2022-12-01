import { NextFunction, Request, Response } from 'express'
import { BalanceRange } from '../../types'
import { Operation } from '../db/models/operation.model'
import OperationService from '../services/operation.service'

const service = new OperationService(Operation)

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

export const updateOperationController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { user, body } = req
  try {
    const updated = await service.update(+id, user, body)
    res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}

export const getBalanceController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { range } = req.query
  const { user } = req
  try {
    const { income, outflow } = await service.getBalances(range as BalanceRange, user)
    res.status(200).json({ income, outflow })
  } catch (error) {
    next(error)
  }
}

export const getGeneralBalanceController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req
  try {
    const balance = await service.getGeneralBalance(user)
    console.log(balance)
    res.status(200).json(balance)
  } catch (error) {
    next(error)
  }
}
