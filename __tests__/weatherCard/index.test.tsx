import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WeatherCard from '../../src/components/WeatherCard'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../src/styled'

configure({ adapter: new Adapter() })

const data = {
    time: 1621454934, //19 May 2021
    temperature: 30,
    icon: '10d'
}

const shallowWithTheme = (children: any) => shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

describe('WeatherCard component test', () => {
  it('Should match the snapshot', () => {
    const weatherCard = shallowWithTheme(<WeatherCard {...data}/>)
    expect(weatherCard.html()).toMatchSnapshot()
    expect(weatherCard.exists()).toBe(true)
  })

  it('Test get date', () => {
    const weatherCard = shallow(<WeatherCard {...data}/>)
    expect(weatherCard.find("span").at(0).text()).toBe("19 May 2021");
  })

  it('Test temperature + ', () => {
    const weatherCard = shallow(<WeatherCard {...data}/>)
    expect(weatherCard.find("span").at(1).text()).toBe("+30°");
  })

  it('Test temperature - ', () => {
    const weatherCard = shallow(<WeatherCard {...data} temperature={-20}/>)
    expect(weatherCard.find("span").at(1).text()).toBe("-20°");
  })
})
