import { ICalendarProps } from '../Calendar/interfaces'

export interface IDatePickerProps extends ICalendarProps{
    placeholder?: string;
    value: Date | null;
}