const DAYS_IN_WEEK = 7

const MAX_WEEK_IN_MONTH = 6

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5]

const WEEK_DAYS_FROM_MONDAY_EU = [0, 1, 2, 3, 4, 5, 6]

const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  Novermber: 10,
  December: 11
}

export const areEqual = (a: Date | undefined, b: Date | undefined): boolean => {
  if (!a || !b) return false

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export const qt = (a: Date | undefined, b: Date | undefined): boolean => {
  if (!a || !b) return false

  return (
    new Date(a.getFullYear(), a.getMonth(), a.getDate()) >
    new Date(b.getFullYear(), b.getMonth(), b.getDate())
  )
}

export const isLeapYear = (year: number): boolean => {
  return !(year % 4 || (!(year % 100) && year % 400))
}

export const getDaysInMonth = (date: Date): number => {
  const month = date.getMonth()
  const year = date.getFullYear()
  const daysInMonth = DAYS_IN_MONTH[month]

  if (isLeapYear(year) && month === Month.February) {
    return daysInMonth + 1
  } else {
    return daysInMonth
  }
}

export const getDayOfWeek = (date: Date, startWeek: 'Su' | 'Mo' = 'Su'): number => {
  const dayOfWeek = date.getDay()

  return startWeek === 'Su'
    ? WEEK_DAYS_FROM_MONDAY_EU[dayOfWeek]
    : WEEK_DAYS_FROM_MONDAY[dayOfWeek]
}

export const getMonthData = (year: number, month: number, startWeek: 'Su' | 'Mo' = 'Su'): Array<Array<(Date| undefined)>> => {
  const result: Array<Array<(Date| undefined)>> = []
  const date: Date = new Date(year, month)
  const daysInMonth: number = getDaysInMonth(date)
  const monthStartsOn: number = getDayOfWeek(date, startWeek)
  let day: number = 1
  let dayAfterMonth: number = 1

  for (let i = 0; i < MAX_WEEK_IN_MONTH; i++) {
    result[i] = []
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if (i === 0 && j < monthStartsOn) {
        result[i][j] = new Date(year, month, j - monthStartsOn + 1)
      } else if (day > daysInMonth) {
        result[i][j] = new Date(year, month + 1, dayAfterMonth++)
      } else {
        result[i][j] = new Date(year, month, day++)
      }
    }
  }

  return result
}
