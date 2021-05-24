import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import DatePicker from '../../src/components/DatePicker'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../src/styled'
import { Input } from '../../src/components/styles'
import { act } from 'react-dom/test-utils'
import Calendar from '../../src/components/Calendar'
import { createDocumentListenersMock } from '../createDocumentListenersMock'
import { PickerContainer } from '../../src/components/DatePicker/datepicker.styles'

configure({ adapter: new Adapter() })

const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

const mountWithTheme = (children: any) =>
  mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

describe('Select component test', () => {

    it('Should match the snapshot', () => {
        const date = new Date(2021, 4, 1)
        const datePicker = shallowWithTheme(<DatePicker value={date}/>)
        expect(datePicker.html()).toMatchSnapshot()
        expect(datePicker.exists()).toBe(true)
    })

    it('Should match the snapshot opne calendar', () => {
        const date = new Date(2021, 4, 1)
        const datePicker = mountWithTheme(<DatePicker value={date}/>)
        datePicker.find(Input).simulate('click')
        expect(datePicker.html()).toMatchSnapshot()
        expect(datePicker.exists()).toBe(true)
    })

    it('Test getDateString', () => {
        const date = new Date(2021, 4, 1)
        const datePicker = mountWithTheme(<DatePicker value={date}/>)
        expect(datePicker.find(Input).props().value).toBe('1/5/2021')
    })

    it('Test getDateString null', () => {
        const date = null
        const datePicker = mountWithTheme(<DatePicker value={date}/>)
        expect(datePicker.find(Input).props().value).toBe('')
    })

    it('Open calendar', () => {
        const date = new Date(2021, 4, 1)
        const datePicker = shallow(<DatePicker value={date}/>)
        expect(datePicker.props().visible).toBe(false)
        datePicker.find(Input).simulate('click')
        expect(datePicker.props().visible).toBe(true)
    })

    it('Change calendar', () => {
        const date = new Date(2021, 4, 1)
        const onChange = jest.fn()
        const datePicker = shallow(<DatePicker value={date} onChange={onChange}/>)
        expect(datePicker.props().visible).toBe(false)
        datePicker.find(Input).simulate('click')
        jest.useFakeTimers()
        datePicker.find(Calendar).at(0).simulate('change')
        jest.runAllTimers()
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(datePicker.props().visible).toBe(false)
    })

    it('Click outside', () => {
        const fireEvent = createDocumentListenersMock();
        const date = new Date(2021, 4, 1)
        const onChange = jest.fn()
        const datePicker = mountWithTheme(<DatePicker value={date} onChange={onChange}/>)
        datePicker.find(Input).at(0).simulate('click')
        expect(datePicker.find(PickerContainer).props().visible).toBe(true)
        act(()=>{
            fireEvent.mouseDown(document.body);
        })
        datePicker.find(PickerContainer).at(0).simulate('mousedown')
        expect(datePicker.find(PickerContainer).props().visible).toBe(false)
    })
})