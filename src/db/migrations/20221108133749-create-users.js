const TABLE_NAME = 'users'

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
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME)
  }
}
