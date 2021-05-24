import { ICoordinates } from '../../interfaces'

export interface IOption {
  value: ICoordinates
  label: string
}

export interface ISelectProps {
  onChange?: (value: ICoordinates) => void
  placeholder?: string
  options?: IOption[]
  value?: ICoordinates
}
