import { FindOptions, Model, ModelStatic } from 'sequelize'

export default class BaseService<M extends ModelStatic<any>> {
  constructor (
    protected model: M
  ) {}

  async findOne (options: FindOptions): Promise< Model | null> {
    const instance = await this.model.findOne(options)
    return instance
  }
}
