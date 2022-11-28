import { ForeignKey, Model } from 'sequelize'
import { BaseModelAttributesWithParanoid } from './base.model'
import { UserInstance } from './user.model'

export const enum OperationType {
  INCOME = 'income',
  OUTFLOW = 'outflow'
}

export interface OperationAttributes extends BaseModelAttributesWithParanoid {
  concept: string
  type: OperationType
  amount: number
  date: Date
  userId: ForeignKey<UserInstance['id']>
  categoryId: ForeignKey<UserInstance['id']> | null
}

export interface OperationInstance extends Model, OperationAttributes {}

export interface CreateOperationDto extends Pick<OperationInstance, 'concept' | 'type' | 'amount' | 'date'> {
  category: string
}

export interface OperationOutputBase extends Pick<OperationInstance, 'concept' | 'amount' | 'date' | 'createdAt' | 'id' | 'type'> {}

export interface OperationUpdateInput {
  concept?: string
  type?: OperationType
  amount?: number
  date?: Date
  categoryId?: ForeignKey<OperationInstance['id']> | null
}

export interface Balance {
  income: number
  outflow: number
}
