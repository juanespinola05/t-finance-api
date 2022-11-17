const TABLE_NAME = 'operations'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
      },
      concept: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.FLOAT
      },
      date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        validate: {
          isIn: [['income', 'outflow']]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.DataTypes.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'deleted_at'
      },
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME)
  }
}
