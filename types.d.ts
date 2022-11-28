declare global {
  namespace Express {
    export interface Request {
      user: any
    }
  }

  namespace Intl {
    class ListFormat {
      constructor (locales?: string | string[], options?: Intl.ListFormatOptions)
      public format: (items?: string[]) => string
    }
  }
}

type PrimaryKey = number

export const enum BalanceRange {
  LAST_MONTH = 'lastmonth',
  LAST_WEEK = 'lastweek',
  THIS_MONTH = 'thismonth'
}
