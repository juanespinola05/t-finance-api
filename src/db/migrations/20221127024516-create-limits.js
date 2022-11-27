const TABLE_NAME = 'limits'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      amount: {
        type: Sequelize.DataTypes.FLOAT
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
      userId: {
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    }
    )
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME)
  }
}
