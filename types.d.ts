import { JwtPayload } from 'jsonwebtoken'

export interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface Operation {
  id: number
  concept: string
  type: 'income' | 'outflow'
  amount: number
  date: Date
  userId: number
  categoryId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type UserCreationAttributes = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UserLoginAttributes = Pick<User, 'email' | 'password'>
export type OperationCreationAttributes = Pick<Operation, 'concept' | 'type' | 'amount' | 'date'> & { category: string }

type UserPayload = Pick<User, 'email'>
declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload | string
    }
  }
}
