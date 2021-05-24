import React from 'react'
import { ICoordinates } from 'interfaces'
import { observer } from 'mobx-react'
import { cities } from 'data'
import { Select, FillFields, Carousel, DatePicker, WeatherCard, Snackbar } from 'components'
import { weatherForecast } from 'store/weatherForecast'
import { weatherArchive } from 'store/weatherArchive'
import {
  ForecastSection,
  Title,
  ForecastContainer,
  ForecastCard,
  FlexInput,
  OneCard,
  OfflineLogo
} from './Forecast.styles'
import offline from 'assets/offline.svg'
import { useIsOnline } from 'hooks/isOnline'

const Forecast: React.FC = () => {
  const online: boolean = useIsOnline()
  return (
    <ForecastSection>
      <OfflineLogo src={offline} online={online}/>
      <Title>
        <h1>Weather</h1>
        <h1>forecast</h1>
      </Title>
      <ForecastContainer>
        <WeatherForecast />
        <WeatherArchive />
      </ForecastContainer>
    </ForecastSection>
  )
}

const WeatherForecast: React.FC = observer(() => {
  const handleSelectChange = async (coordinates: ICoordinates): Promise<void> => {
    weatherForecast.setCoordinates(coordinates)
    await weatherForecast.fetchForecast()
  }
  return (
    <ForecastCard>
      <h2>7 Days Forecast</h2>
      <Select
        placeholder={'Select city'}
        options={cities}
        onChange={handleSelectChange}
        value={weatherForecast.coordinates}
      />
      {weatherForecast.data.length ? <Carousel data={weatherForecast.data} /> : <FillFields />}
      <Snackbar message={weatherForecast.error}/>
    </ForecastCard>
  )
})

const WeatherArchive: React.FC = observer(() => {
  const blockDay = {
    beforeDay: new Date(new Date().getTime() - 6 * 24 * 3600 * 1000),
    afterDay: new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)
  }
  const handleSelectChange = async (coordinates: ICoordinates): Promise<void> => {
    weatherArchive.setCoordinates(coordinates)
    await weatherArchive.fetchForecast()
  }
  const handleDatePickerChange = async (day: Date): Promise<void> => {
    weatherArchive.setDay(day)
    await weatherArchive.fetchForecast()
  }

  return (
    <ForecastCard>
      <h2>Forecast for a Date in the Past</h2>
      <FlexInput>
        <Select
          placeholder={'Select city'}
          options={cities}
          onChange={handleSelectChange}
          value={weatherArchive.coordinates}
        />
        <DatePicker
          value={weatherArchive.day}
          onChange={handleDatePickerChange}
          blockDay={blockDay}
        />
      </FlexInput>
      {weatherArchive.data ? (<OneCard><WeatherCard {...weatherArchive.data} />{' '}</OneCard>) : (<FillFields />)}
      <Snackbar message={weatherArchive.error}/>
    </ForecastCard>
  )
})

export default Forecast
