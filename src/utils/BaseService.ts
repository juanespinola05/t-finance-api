import { ModelStatic } from 'sequelize'

export default class BaseService<M extends ModelStatic<any>> {
  constructor (
    protected model: M
  ) {}

  async findOne (id: number): Promise<M | null> {
    const foo = await this.model.findOne({
      where: {
        id
      }
    })
    return foo
  }
}
