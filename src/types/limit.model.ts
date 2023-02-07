import { Model } from 'sequelize'
import { BaseModelAttributes } from './base.model'

export interface LimitAttributes extends BaseModelAttributes {
  amount: number
}

export interface LimitState extends Pick<LimitAttributes, 'amount'> {
  outflowBalance: number
}

export interface LimitInstance extends Model, LimitAttributes {}
