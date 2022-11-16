import { OperationCreationAttributes } from '../../types'
import { Operation } from '../db/models/operation.model'

export default class OperationService {
  async create (data: OperationCreationAttributes, user: { email: string }): Promise<Operation> {
    // todo: acaa
  }
}
