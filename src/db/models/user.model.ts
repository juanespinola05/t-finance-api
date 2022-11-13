import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ModelAttributes, InitOptions } from 'sequelize'

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

  static associate (sequelize: Sequelize): void {
    this.hasMany(sequelize.models.Operation, {
      as: 'operations',
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
