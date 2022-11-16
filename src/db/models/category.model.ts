import { Sequelize, Model, DataTypes, ModelAttributes, InferAttributes, InferCreationAttributes, CreationOptional, InitOptions, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, NonAttribute, Association } from 'sequelize'
import { Operation } from './operation.model'

const TABLE_NAME = 'categories'

export const categorySchema: ModelAttributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  tagname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  }
}

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare id: CreationOptional<number>
  declare tagname: string
  declare createdAt: CreationOptional<Date>

  declare getOperation: HasManyGetAssociationsMixin<Operation>
  declare addOperation: HasManyAddAssociationMixin<Operation, number>
  declare addOperations: HasManyAddAssociationsMixin<Operation[], number>
  declare setOperations: HasManySetAssociationsMixin<Operation, number>
  declare removeOperation: HasManyRemoveAssociationMixin<Operation, number>
  declare removeOperations: HasManyRemoveAssociationsMixin<Operation, number>
  declare hasOperation: HasManyHasAssociationMixin<Operation, number>
  declare hasOperations: HasManyHasAssociationsMixin<Operation, number>
  declare countOperations: HasManyCountAssociationsMixin
  declare createOperation: HasManyCreateAssociationMixin<Operation, 'categoryId'>

  declare operations?: NonAttribute<Operation[]>

  declare static associations: {
    operations: Association<Operation, Category>
  }

  static associate (sequelize: Sequelize): void {
    this.hasMany(sequelize.models.Operation, {
      as: 'operations',
      foreignKey: 'categoryId'
    })
  }

  static config (sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      modelName: 'Category',
      tableName: TABLE_NAME,
      timestamps: false
    }
  }
}
