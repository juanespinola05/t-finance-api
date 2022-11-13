import { ModelAttributes, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, InitOptions, Sequelize } from 'sequelize'

export const TABLE_NAME = 'operations'

export const operationSchema: ModelAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  concept: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      isIn: [['income', 'outflow']]
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at'
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at'
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'operations',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

export class Operation extends Model<InferAttributes<Operation>, InferCreationAttributes<Operation>> {
  declare id: CreationOptional<number>
  declare concept: string
  declare amount: number
  declare date: Date
  declare type: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  static associate (sequelize: Sequelize): void {
    this.belongsTo(sequelize.models.User, {
      as: 'user'
    })
  }

  static config (sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      modelName: 'Operation',
      tableName: TABLE_NAME,
      timestamps: true,
      paranoid: true
    }
  }
}
