import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/auth.service'

const service = new AuthService()

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body } = req
    const registration = await service.register(body)
    res.status(201).json(registration)
  } catch (error) {
    next(error)
  }
}
