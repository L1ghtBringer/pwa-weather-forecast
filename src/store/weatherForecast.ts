import { makeAutoObservable, runInAction } from 'mobx'
import { IWeatherDay, ICoordinates, IWeatherForecastStore, Error } from 'interfaces'

export class WeatherForecastStore implements IWeatherForecastStore {
  data: IWeatherDay[] = []
  error: Error = { text: null }
  coordinates: ICoordinates = {
    latitude: null,
    longitude: null
  }

  constructor () {
    makeAutoObservable(this)
  }

  setCoordinates (coordinates: ICoordinates): void {
    this.coordinates = coordinates
  }

  async fetchForecast (): Promise<void> {
    if (!this.coordinates.latitude || !this.coordinates.longitude) return
    this.data = []
    this.error = { text: null }

    const url = new URL('https://api.openweathermap.org/data/2.5/onecall')

    url.search = String(
      new URLSearchParams({
        lat: `${this.coordinates.latitude}`,
        lon: `${this.coordinates.longitude}`,
        exclude: 'hourly,alerts,minutely,current',
        units: 'metric',
        appid: String(process.env.REACT_APP_API_KEY)
      })
    )

    await fetch(String(url))
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401) {
            this.error = { text: 'Invalid API key. Write to developer' }
            return response
          }
          if (response.status === 400) {
            this.error = { text: 'Invalid data to send. Write to developer' }
            return response
          }
        }
        return await response.json()
      })
      .then(data => {
        runInAction(() => {
          this.data = data.daily.slice(1).map((day: any) => {
            const newDay: IWeatherDay = {
              time: day.dt,
              temperature: day.temp.day,
              icon: day.weather[0].icon
            }
            return newDay
          })
        })
      })
      .catch(() => {
        if (!this.error.text) {
          this.error = { text: 'Fetch error. Check your internet connection and try again' }
        }
      })
  }
}

export const weatherForecast = new WeatherForecastStore()
