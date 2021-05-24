import React from 'react'
import { WeatherContainer } from './weathercatd.styles'
import { IWeatherDay } from '../../interfaces'

const WeatherCard: React.FC<IWeatherDay> = ({ time, temperature, icon }) => {
  const getDateString = (date: number): string => {
    const dateFormat = new Date(date * 1000)
    const month = dateFormat.toLocaleString('en', { month: 'long' })
    return `${dateFormat.getDate()} ${month} ${dateFormat.getFullYear()}`
  }

  return (
    <WeatherContainer>
      <span>{getDateString(time)}</span>
      <img src={require(`./icons/${icon}.png`).default} alt="icons" />
      <span>
        {temperature > 0
          ? `+${temperature.toFixed(0)}°`
          : `${temperature.toFixed(0)}°`}
      </span>
    </WeatherContainer>
  )
}

export default WeatherCard
