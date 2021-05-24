import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Select from '../../src/components/Select'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../src/styled'
import {
  Option,
  SelectContainer,
} from '../../src/components/Select/select.styles'
import { Input } from '../../src/components/styles'
import { act } from 'react-dom/test-utils'
import { createDocumentListenersMock } from '../createDocumentListenersMock'

configure({ adapter: new Adapter() })

const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

const mountWithTheme = (children: any) =>
  mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

describe('Select component test', () => {
  it('Should match the snapshot', () => {
    const select = shallowWithTheme(<Select options={cities} />)
    expect(select.html()).toMatchSnapshot()
    expect(select.exists()).toBe(true)
  })

  it('Open window', () => {
    const select = shallow(<Select options={cities} />)
    expect(select.props().visible).toBe(false)
    select.find(Input).simulate('click')
    expect(select.props().visible).toBe(true)
  })

  it('Test select + reselect', () => {
    const select = shallow(<Select options={cities} />)
    const option = select.find(Option).at(0).text()
    expect(select.find(Input).props().value).toBe('')
    select.find(Option).at(0).simulate('click')
    expect(select.find(Input).props().value).toBe(option)
  })

  it('Test reselect', () => {
    const select = shallow(<Select options={cities} />)
    const option = select.find(Option).at(0).text()
    expect(select.find(Input).props().value).toBe('')
    select.find(Option).at(0).simulate('click')
    expect(select.find(Input).props().value).toBe(option)

    const optionTwo = select.find(Option).at(1).text()
    select.find(Option).at(1).simulate('click')
    expect(select.find(Input).props().value).toBe(optionTwo)
  })

  it('Change test', () => {
    const onChange = jest.fn()
    const select = shallow(<Select options={cities} onChange={onChange} />)
    select.find(Option).at(0).simulate('click')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('One change test', () => {
    const value = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    const onChange = jest.fn()
    const select = shallow(
      <Select options={cities} value={value} onChange={onChange} />
    )
    select.find(Option).at(0).simulate('click')
    select.find(Option).at(0).simulate('click')
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  it('Click outside', () => {
    const onChange = jest.fn()
    const fireEvent = createDocumentListenersMock();
    const select = mountWithTheme(<Select options={cities} onChange={onChange} />)
    select.find(Input).at(0).simulate('click')
    expect(select.find(SelectContainer).props().visible).toBe(true)
    act(()=>{
        fireEvent.mouseDown(document.body);
    })
    select.find(Select).at(0).simulate('mousedown')
    expect(select.find(SelectContainer).props().visible).toBe(false)
  })
})

const cities = [
  {
    value: {
      latitude: 55.796127,
      longitude: 49.106405,
    },
    label: 'Kazan',
  },
  {
    value: {
      latitude: 45.03547,
      longitude: 38.975313,
    },
    label: 'Krasnodar',
  },
  {
    value: {
      latitude: 53.195873,
      longitude: 50.100193,
    },
    label: 'Samara',
  },
  {
    value: {
      latitude: 51.533557,
      longitude: 46.034257,
    },
    label: 'Saratov',
  },
  {
    value: {
      latitude: 53.507836,
      longitude: 49.420393,
    },
    label: 'Tolyatti',
  },
]
