import { Model } from 'sequelize'

export interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export type UserModel = User & Model | null

export type UserCreationAttributes = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UserLoginAttributes = Pick<User, 'email' | 'password'>
