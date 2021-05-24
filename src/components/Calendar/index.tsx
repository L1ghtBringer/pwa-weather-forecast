import React, { useState } from 'react'
import { ICalendarProps } from './interfaces'
import { Button, CalendarCard, Footer, Header, Table } from './calendar.styles'
import { getMonthData, areEqual, qt } from './calendar'
import { locale } from './locale/en_GB'

const defaultProps: ICalendarProps = {
  locale,
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  onChange: (date: Date) => {}
}

interface IState {
  date: Date
  currentDate: Date
  selectedDate: Date | null
}

const Calendar: React.FC<ICalendarProps> = ({
  years,
  locale,
  selectedDate,
  blockDay,
  onChange,
  style
}) => {
  const [state, setState] = useState<IState>({
    date: selectedDate ?? new Date(),
    currentDate: new Date(),
    selectedDate: selectedDate ?? null
  })

  const year: number = state.date.getFullYear()
  const month: number = state.date.getMonth()

  const monthDate = getMonthData(year, month, locale ? locale.startWeek : 'Su')

  const handlePrevMonthButtonClick = (): void => {
    setState((prevState) => ({
      ...prevState,
      date: new Date(year, month - 1)
    }))
  }

  const handleNextMonthButtonClick = (): void => {
    setState((prevState) => ({
      ...prevState,
      date: new Date(year, month + 1)
    }))
  }

  const handleDayClick = (date: Date): void => {
    setState((prevState) => ({ ...prevState, date, selectedDate: date }))
    onChange!(date)
  }

  const setTodayDay = (): void => {
    if (!disabledDay(new Date()) && onChange) {
      const today = new Date()
      setState((prevState) => ({
        ...prevState,
        date: today,
        selectedDate: today
      }))
      onChange(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    }
  }

  const disabledDay = (date: Date): boolean => {
    if (!blockDay) return false
    if (qt(date, blockDay.afterDay) || !qt(date, blockDay.beforeDay)) {
      return true
    }
    return false
  }

  return (
    <CalendarCard styleUser={String(style)}>
      <Header>
        <Button
          padding={'.5em'}
          onClick={handlePrevMonthButtonClick}
          disabled={new Date(year, month - 1).getFullYear() < years![0]}
        >
          {'<'}
        </Button>
        <span>{locale!.monthNames[month]}</span>
        <span>{year}</span>
        <Button
          padding={'.5em'}
          onClick={handleNextMonthButtonClick}
          disabled={
            new Date(year, month + 1).getFullYear() > years![years!.length - 1]
          }
        >
          {'>'}
        </Button>
      </Header>
      <Table>
        <thead>
          <tr>
            {locale!.weekDayNames.map((name) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthDate.map((week, index) => (
            <tr key={index}>
              {week.map((date, index) => (
                <td key={index}>
                  <Button
                    isDate={true}
                    today={areEqual(date, state.currentDate)}
                    selected={areEqual(date, state.selectedDate!)}
                    onClick={() => handleDayClick(date!)}
                    thisMonth={date?.getMonth() === state.date.getMonth()}
                    disabled={disabledDay(date!)}
                  >
                    {date!.getDate()}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Footer>
        <Button disabled={disabledDay(new Date())} onClick={setTodayDay}>
          {locale!.today}
        </Button>
      </Footer>
    </CalendarCard>
  )
}

Calendar.defaultProps = defaultProps

export default Calendar
