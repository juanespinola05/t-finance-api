const fs = require('fs')

function setupModels (sequelize) {
  const models = fs.readdirSync(__dirname).filter(file => file.endsWith('.model.js'))

  models.forEach(file => {
    const { model, schema } = require(`./${file}`)
    model.init(schema, model.config(sequelize))
  })

  Object.keys(sequelize.models).forEach(model => {
    sequelize.models[model].associate(sequelize.models)
  })
}

module.exports = setupModels
