import {
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
  Model,
  NonAttribute
} from 'sequelize'
import { BaseModelAttributes } from './base.model'
import { OperationInstance } from './operation.model'

export interface CategoryAttributes extends BaseModelAttributes {
  tagname: string
  color: string
}

export interface CategoryInstance extends Model, CategoryAttributes {
  getOperation: HasManyGetAssociationsMixin<OperationInstance>
  addOperation: HasManyAddAssociationMixin<OperationInstance, number>
  addOperations: HasManyAddAssociationsMixin<OperationInstance[], number>
  setOperations: HasManySetAssociationsMixin<OperationInstance, number>
  removeOperation: HasManyRemoveAssociationMixin<OperationInstance, number>
  removeOperations: HasManyRemoveAssociationsMixin<OperationInstance, number>
  hasOperation: HasManyHasAssociationMixin<OperationInstance, number>
  hasOperations: HasManyHasAssociationsMixin<OperationInstance, number>
  countOperations: HasManyCountAssociationsMixin
  createOperation: HasManyCreateAssociationMixin<OperationInstance, 'categoryId'>
  operations?: NonAttribute<OperationInstance[]>
}

// export interface CategoryOutput extends Required<Category> {}
