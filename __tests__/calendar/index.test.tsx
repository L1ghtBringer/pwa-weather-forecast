import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Calendar from '../../src/components/Calendar'
import { Header, Button } from '../../src/components/Calendar/calendar.styles'
import MockDate from 'mockdate'

configure({ adapter: new Adapter() })

describe('Calendar component test', () => {
  it('Should match the snapshot', () => {
    const calendar = shallow(<Calendar />)
    expect(calendar.html()).toMatchSnapshot()
    expect(calendar.exists()).toBe(true)
  })

  it('Test default date', () => {
    MockDate.set('2021-05-01')
    const calendar = shallow(<Calendar />)
    expect(calendar.find(Header).at(0).text()).toBe('<May2021>')
    MockDate.reset()
  })

  it('Test props date', () => {
    const date = new Date(2021, 4, 1)
    const calendar = shallow(<Calendar selectedDate={date}/>)
    expect(calendar.find(Header).at(0).text()).toBe('<May2021>')
    MockDate.reset()
  })

  it('Prev month', () => {
    MockDate.set('2021-05-01')
    const calendar = shallow(<Calendar />)
    expect(calendar.find(Header).at(0).text()).toBe('<May2021>')
    calendar.find(Button).at(0).simulate('click')
    expect(calendar.find(Header).at(0).text()).toBe('<April2021>')
  })

  it('Prev month disabled', () => {
    MockDate.set('2021-01-01')
    const calendar = shallow(<Calendar years={[2021]} />)
    expect(calendar.find(Header).at(0).text()).toBe('<January2021>')
    expect(calendar.find(Button).at(0).props().disabled).toBe(true)
  })

  it('Next month', () => {
    MockDate.set('2021-04-01')
    const calendar = shallow(<Calendar />)
    expect(calendar.find(Header).at(0).text()).toBe('<April2021>')
    calendar.find(Button).at(1).simulate('click')
    expect(calendar.find(Header).at(0).text()).toBe('<May2021>')
  })

  it('Next month disabled', () => {
    MockDate.set('2021-12-01')
    const calendar = shallow(<Calendar years={[2021]} />)
    expect(calendar.find(Header).at(0).text()).toBe('<December2021>')
    expect(calendar.find(Button).at(1).props().disabled).toBe(true)
  })

  it('Set today', () => {
    let expectedDate: Date | null = null
    const onChange = jest.fn((date: Date) => (expectedDate = date))
    MockDate.set('2021-5-05')
    const calendar = shallow(<Calendar onChange={onChange} />)
    calendar.find(Button).last().simulate('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(expectedDate).toEqual(new Date(2021, 4, 5))
  })

  it('Set day', () => {
    let expectedDate: Date | null = null
    const onChange = jest.fn((date: Date) => (expectedDate = date))
    MockDate.set('2021-5-05')
    const calendar = shallow(<Calendar onChange={onChange} />)
    const selectDate = calendar.find(Button).at(2).text()
    calendar.find(Button).at(2).simulate('click')
    expect(expectedDate).toEqual(new Date(2021, 3, Number(selectDate)))
  })

  it('This month', () => {
    MockDate.set('2021-5-05')
    const calendar = shallow(<Calendar/>)
    expect(calendar.find(Button).at(2).props().thisMonth).toBe(false)
    expect(calendar.find(Button).at(10).props().thisMonth).toBe(true)
  })

  it('Check disabled day', () => {
    const blockDay = {
      beforeDay: new Date(2021, 4, 1),
      afterDay: new Date(2021, 4, 4),
    }
    MockDate.set('2021-5-01')
    const calendar = shallow(<Calendar blockDay={blockDay} />)
    expect(calendar.find(Button).at(2).props().disabled).toBe(true)
    expect(calendar.find(Button).at(8).props().disabled).toBe(true)
    expect(calendar.find(Button).at(9).props().disabled).toBe(false)
    expect(calendar.find(Button).at(11).props().disabled).toBe(false)
    expect(calendar.find(Button).at(12).props().disabled).toBe(true)
  })

  it('Check disabled day set today', () => {
    const blockDay = {
      beforeDay: new Date(2021, 4, 2),
      afterDay: new Date(2021, 4, 4),
    }
    MockDate.set('2021-5-01')
    const calendar = shallow(<Calendar blockDay={blockDay} />)
    const onChange = jest.fn(() => {})
    calendar.find(Button).last().simulate('click')
    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
