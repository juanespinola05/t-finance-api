const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Juan Sebastian Espinola',
        email: 'juan@juanse.dev',
        password: bcrypt.hashSync('password', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users')
  }
}
