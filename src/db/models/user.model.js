const { DataTypes, Model } = require('sequelize')

const TABLE_NAME = 'users'

const userSchema = {
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

class User extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: 'User',
      timestamps: true
    }
  }
}

module.exports = {
  tableName: TABLE_NAME,
  schema: userSchema,
  model: User
}
