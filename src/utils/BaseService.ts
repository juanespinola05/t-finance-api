import { ModelStatic } from 'sequelize'
import sequelize from '../lib/sequelize'

const { models } = sequelize
const { Operation } = models

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

export class OperationService extends BaseService<typeof Operation> {

}
