/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        tagname: 'personal',
        created_at: new Date()
      },
      {
        tagname: 'food',
        created_at: new Date()
      },
      {
        tagname: 'expenses',
        created_at: new Date()
      },
      {
        tagname: 'house',
        created_at: new Date()
      }
    ], {})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('categories')
  }
}
