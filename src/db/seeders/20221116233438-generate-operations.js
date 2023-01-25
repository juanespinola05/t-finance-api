const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const operations = Array.from({ length: 100 }, () => {
      const operation = {
        concept: faker.lorem.sentence(4),
        type: ['income', 'outflow'][faker.datatype.number({ min: 0, max: 1 })],
        date: faker.date.recent(100),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        user_id: 1
      }
      const isOutflow = operation.type === 'outflow'
      operation.amount = isOutflow
        ? faker.datatype.number({ min: 1 }) * -1
        : faker.datatype.number({ min: 1 })

      operation.category_id = isOutflow
        ? [1, 2, 3, 4][faker.datatype.number({ min: 0, max: 4 })]
        : null
      return operation
    })
    await queryInterface.bulkInsert('operations', [...operations])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('operations')
  }
}
