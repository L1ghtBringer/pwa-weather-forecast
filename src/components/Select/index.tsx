import React, { useState } from 'react'
import { ISelectProps, IOption } from './interfaces'
import { useClickOutside } from '../../hooks/clickOutside'
import { SelectContainer, OptionContainer, Option } from './select.styles'
import { Input } from '../styles'
import arrow from './icons/arrow.svg'

const defaultProps: ISelectProps = {
  placeholder: 'Select data',
  onChange: () => {},
  value: {
    latitude: null,
    longitude: null
  }
}

const Select: React.FC<ISelectProps> = ({
  placeholder,
  options,
  onChange,
  value
}) => {
  const [text, setText] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const myRef = useClickOutside<HTMLDivElement>(handleClickOutside)

  function handleClickOutside (event: Event): void {
    setOpen(false)
  }

  const handleClickOption = (option: IOption): void => {
    setOpen(false)
    if (
      !(
        value?.latitude === option.value.latitude &&
        value?.longitude === option.value.longitude
      )
    ) {
      onChange!(option.value)
      setText(option.label)
    }
  }

  return (
    <SelectContainer ref={myRef} visible={open}>
      <Input
        placeholder={placeholder}
        value={text}
        onClick={() => setOpen((prevState) => !prevState)}
        readOnly
      />
      <img src={arrow} alt="icon-arrow" />
      <OptionContainer visible={open}>
        <div>
          {options!.map((element) => (
            <Option
              key={element.label}
              onClick={() => handleClickOption(element)}
              visible={open}
            >
              {element.label}
            </Option>
          ))}
        </div>
      </OptionContainer>
    </SelectContainer>
  )
}

Select.defaultProps = defaultProps

export default Select
