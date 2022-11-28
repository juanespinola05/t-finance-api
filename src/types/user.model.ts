import {
  Association,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  NonAttribute
} from 'sequelize'
import { PrimaryKey } from '../../types'
import { Limit } from '../db/models/limit.model'
import { Operation } from '../db/models/operation.model'
import { User } from '../db/models/user.model'
import { BaseModelAttributes } from './base.model'
import { OperationInstance } from './operation.model'

export interface UserAttributes extends BaseModelAttributes {
  name: string
  email: string
  password: string
}

export interface UserInstance extends Model, UserAttributes {
  getOperations: HasManyGetAssociationsMixin<OperationInstance>
  addOperation: HasManyAddAssociationMixin<OperationInstance, PrimaryKey>
  addOperations: HasManyAddAssociationsMixin<OperationInstance, PrimaryKey>
  setOperations: HasManySetAssociationsMixin<OperationInstance, PrimaryKey>
  removeOperation: HasManyRemoveAssociationMixin<OperationInstance, number>
  removeOperations: HasManyRemoveAssociationsMixin<OperationInstance, number>
  hasOperation: HasManyHasAssociationMixin<OperationInstance, number>
  hasOperations: HasManyHasAssociationsMixin<OperationInstance, number>
  countOperations: HasManyCountAssociationsMixin
  createOperation: HasManyCreateAssociationMixin<OperationInstance, 'userId'>

  getLimit: HasOneGetAssociationMixin<Limit>
  setLimit: HasOneSetAssociationMixin<Limit, number>
  createLimit: HasOneCreateAssociationMixin<Limit>

  operations?: NonAttribute<Operation[]>

  associations: {
    operations: Association<User, Operation>
  }
}

export interface CreateUserDto extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface LoginUserDto extends Pick<UserAttributes, 'email' | 'password'> {}
