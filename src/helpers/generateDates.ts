import { BalanceRange, Period } from '../../types'
import { months } from '../constants/months'
import setDateToZero from './setTimeToZero'

interface RangeDates {
  from: Date
  to: Date
}

const rangeFromPeriod = ({ month, year }: Period): RangeDates => {
  const from = setDateToZero(new Date(`${year}-${month}-01`))
  const to = new Date(from)
  to.setMonth(month + 1)

  return { from, to }
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

function generateDates (range: BalanceRange): RangeDates
function generateDates (period: Period): RangeDates

function generateDates (range: BalanceRange | Period): RangeDates {
  switch (range) {
    case BalanceRange.LAST_MONTH:
      return lastMonthRange()
    case BalanceRange.LAST_WEEK:
      return lastWeekRange()
    case BalanceRange.THIS_MONTH:
      return thisMonthRange()
    default:
      return rangeFromPeriod(range)
  }
}

export default generateDates
