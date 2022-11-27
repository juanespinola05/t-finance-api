/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        tagname: 'personal',
        color: '#ff9238',
        created_at: new Date()
      },
      {
        id: 2,
        tagname: 'food',
        color: '#ff9238',
        created_at: new Date()
      },
      {
        id: 3,
        tagname: 'expenses',
        color: '#ff9238',
        created_at: new Date()
      },
      {
        id: 4,
        tagname: 'house',
        color: '#ff9238',
        created_at: new Date()
      }
    ], {})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('categories')
  }
}
