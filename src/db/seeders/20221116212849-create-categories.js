/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        tagname: 'personal',
        created_at: new Date()
      },
      {
        id: 2,
        tagname: 'food',
        created_at: new Date()
      },
      {
        id: 3,
        tagname: 'expenses',
        created_at: new Date()
      },
      {
        id: 4,
        tagname: 'house',
        created_at: new Date()
      }
    ], {})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('categories')
  }
}
