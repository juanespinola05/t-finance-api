import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ModelAttributes,
  InitOptions,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  NonAttribute,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin
} from 'sequelize'
import { Limit } from './limit.model'
import { Operation } from './operation.model'

const TABLE_NAME: string = 'users'

export const userSchema: ModelAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare getOperations: HasManyGetAssociationsMixin<Operation>
  declare addOperation: HasManyAddAssociationMixin<Operation, number>
  declare addOperations: HasManyAddAssociationsMixin<Operation, number>
  declare setOperations: HasManySetAssociationsMixin<Operation, number>
  declare removeOperation: HasManyRemoveAssociationMixin<Operation, number>
  declare removeOperations: HasManyRemoveAssociationsMixin<Operation, number>
  declare hasOperation: HasManyHasAssociationMixin<Operation, number>
  declare hasOperations: HasManyHasAssociationsMixin<Operation, number>
  declare countOperations: HasManyCountAssociationsMixin
  declare createOperation: HasManyCreateAssociationMixin<Operation, 'userId'>

  declare getLimit: HasOneGetAssociationMixin<Limit>
  declare setLimit: HasOneSetAssociationMixin<Limit, number>
  declare createLimit: HasOneCreateAssociationMixin<Limit>

  declare operations?: NonAttribute<Operation[]>

  declare static associations: {
    operations: Association<User, Operation>
  }

  static associate (sequelize: Sequelize): void {
    this.hasMany(sequelize.models.Operation, {
      as: 'operations',
      foreignKey: 'userId'
    })
    this.hasOne(sequelize.models.Limit, {
      as: 'limit',
      foreignKey: 'userId'
    })
  }

  static config (sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: 'User',
      timestamps: true
    }
  }
}
