import { PrimaryKey } from '../../types'

export interface BaseModelAttributes {
  readonly id: PrimaryKey
  readonly createdAt: Date
  updatedAt: Date
}

export interface BaseModelAttributesWithParanoid extends BaseModelAttributes {
  deletedAt: Date
}
