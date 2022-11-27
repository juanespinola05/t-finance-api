import { DataTypes, InferAttributes, InferCreationAttributes, InitOptions, Model, ModelAttributes, Sequelize } from 'sequelize'

export const TABLE_NAME = 'limits'

export const limitSchema: ModelAttributes = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL
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
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}

export class Limit extends Model<InferAttributes<Limit>, InferCreationAttributes<Limit>> {
  static associate (sequelize: Sequelize): void {
    this.belongsTo(sequelize.models.User, {
      as: 'user'
    })
  }

  static config (sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      modelName: 'Limit',
      tableName: TABLE_NAME,
      timestamps: false
    }
  }
}
