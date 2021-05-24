import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FillFields from '../../src/components/FillFields'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../src/styled'

configure({ adapter: new Adapter() })

const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

describe('FillFields component test', () => {
  it('Should match the snapshot', () => {
    const weatherCard = shallowWithTheme(<FillFields />)
    expect(weatherCard.html()).toMatchSnapshot()
    expect(weatherCard.exists()).toBe(true)
  })
})
