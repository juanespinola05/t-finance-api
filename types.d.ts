import { ForeignKey } from 'sequelize'

export const enum OperationType {
  INCOME = 'income',
  OUTFLOW = 'outflow'
}
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
  type: OperationType
  amount: number
  date: Date
  userId: number
  categoryId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface Category {
  id: number
  tagname: string
  createdAt: Date
  getOperation: HasManyGetAssociationsMixin<Operation>
  addOperation: HasManyAddAssociationMixin<Operation, number>
  addOperations: HasManyAddAssociationsMixin<Operation[], number>
  setOperations: HasManySetAssociationsMixin<Operation, number>
  removeOperation: HasManyRemoveAssociationMixin<Operation, number>
  removeOperations: HasManyRemoveAssociationsMixin<Operation, number>
  hasOperation: HasManyHasAssociationMixin<Operation, number>
  hasOperations: HasManyHasAssociationsMixin<Operation, number>
  countOperations: HasManyCountAssociationsMixin
  createOperation: HasManyCreateAssociationMixin<Operation, 'categoryId'>
  operations?: NonAttribute<Operation[]>
}

export interface CategoryOutput extends Required<Category> {}

export type UserCreationAttributes = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UserLoginAttributes = Pick<User, 'email' | 'password'>
export type OperationCreationAttributes = Pick<Operation, 'concept' | 'type' | 'amount' | 'date'> & { category: string }
export type OperationOutput = Pick<Operation, 'concept' | 'amount' | 'date' | 'createdAt' | 'id' | 'type'>

export interface OperationUpdateInput {
  concept?: string
  type?: OperationType
  amount?: number
  date?: Date
  categoryId?: ForeignKey<User, 'id'> | null
}

type UserPayload = Pick<User, 'email'>
declare global {
  namespace Express {
    export interface Request {
      user: any
    }
  }

  namespace Intl {
    class ListFormat {
      constructor (locales?: string | string[], options?: Intl.ListFormatOptions)
      public format: (items?: string[]) => string
    }
  }
}
