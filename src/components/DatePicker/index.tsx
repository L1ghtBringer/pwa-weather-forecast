import React, { useState } from 'react'
import Calendar from '../Calendar'
import { IDatePickerProps } from './interfaces'
import { PickerContainer } from './datepicker.styles'
import { Input } from '../styles'
import { ReactComponent as CalendarIcon } from './icons/calendar.svg'
import { useClickOutside } from '../../hooks/clickOutside'

const defaultProps: IDatePickerProps = {
  placeholder: 'Select date',
  value: null,
  onChange: (date: Date) => {}
}

const DatePicker: React.FC<IDatePickerProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const myRef = useClickOutside<HTMLDivElement>(handleClickOutside)

  function handleClickOutside (event: Event): void {
    setVisible(false)
  }

  const handleChange = (date: Date): void => {
    props.onChange!(date)
    setTimeout(() => {
      setVisible(false)
    }, 150)
  }

  const getDateString = (date: Date | null): string => {
    if (!date) return ''
    return `${props.value!.getDate()}/${
      props.value!.getMonth()! + 1
    }/${props.value!.getFullYear()}`
  }

  return (
    <PickerContainer ref={myRef} visible={visible}>
      <Input
        onClick={() => setVisible((prevState) => !prevState)}
        placeholder={props.placeholder}
        value={getDateString(props.value)}
        readOnly
      />
      <CalendarIcon />
      <div>
        {visible && (
          <Calendar
            onChange={handleChange}
            selectedDate={props.value}
            locale={props.locale}
            years={props.years}
            blockDay={props.blockDay}
            style={'position: absolute; margin-top: 12px; z-index:1; right: 0;'}
          />
        )}
      </div>
    </PickerContainer>
  )
}

DatePicker.defaultProps = defaultProps

export default DatePicker
