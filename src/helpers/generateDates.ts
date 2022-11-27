import { BalanceRange } from '../../types'
import { months } from '../constants/months'
import setDateToZero from './setTimeToZero'

interface RangeDates {
  from: Date
  to: Date
}

const lastMonthRange = (): RangeDates => {
  const initialDate = setDateToZero(new Date())
  initialDate.setDate(1)
  const previousMonth = initialDate.getMonth() - 1
  const days = initialDate.getDate()
  const lastMonth = new Date(initialDate.getTime() - days * 86400000)
  return {
    to: lastMonth,
    from: new Date(lastMonth.getTime() - (months[previousMonth] * 86400000))
  }
}

const lastWeekRange = (): RangeDates => {
  const initialDate = new Date()
  const fromDate = new Date(initialDate.getTime() - 7 * 86400000)
  return {
    from: fromDate,
    to: initialDate
  }
}

const thisMonthRange = (): RangeDates => {
  const initialDate = new Date()
  const fromDate = new Date(initialDate.getTime() - initialDate.getDate() * 86400000)
  return {
    from: setDateToZero(fromDate),
    to: initialDate
  }
}

const generateDates = (range: BalanceRange): RangeDates => {
  switch (range) {
    case BalanceRange.LAST_MONTH:
      return lastMonthRange()
    case BalanceRange.LAST_WEEK:
      return lastWeekRange()
    case BalanceRange.THIS_MONTH:
      return thisMonthRange()
    default:
      return lastMonthRange()
  }
}

export default generateDates
