import { ModelStatic, WhereOptions } from 'sequelize'

export default class BaseService<M extends ModelStatic<any>> {
  constructor (
    protected model: M
  ) {}

  async findOne (options: WhereOptions): Promise<M | null> {
    const foo = await this.model.findOne({
      where: options
    })
    return foo
  }
}
