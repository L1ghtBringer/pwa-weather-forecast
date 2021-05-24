export interface IBlockDay {
  beforeDay: Date
  afterDay: Date
}

export interface ILocale {
  monthNames: string[]
  weekDayNames: string[]
  startWeek: 'Su' | 'Mo'
  today: string
}

export interface ICalendarProps {
  locale?: ILocale
  years?: number[]
  blockDay?: IBlockDay
  onChange?: (date: Date) => void
  selectedDate?: Date | null
  style?: string
}
