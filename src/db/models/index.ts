import fs from 'fs'
import { Sequelize } from 'sequelize'

async function setupModels (sequelize: Sequelize): Promise<void> {
  const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.model.js'))

  for (const file of files) {
    const { model, schema } = await import(`./${file}`)
    model.init(schema, model.config(sequelize))
  }
  for (const file of files) {
    const { model } = await import(`./${file}`)
    model.associate(sequelize.models)
  }
}

export default setupModels
