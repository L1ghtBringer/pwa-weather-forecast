import { makeAutoObservable, runInAction } from 'mobx'
import { IWeatherDay, ICoordinates, IWeatherArchiveStore, Error } from 'interfaces'

export class WeatherArchiveStore implements IWeatherArchiveStore {
  data: (IWeatherDay | null) = null
  day: (Date | null) = null
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

  setDay (day: Date): void {
    this.day = day
  }

  async fetchForecast (): Promise<void> {
    if (!(this.coordinates.latitude && this.coordinates.longitude && this.day)) return
    this.data = null
    if (this.day.getTime() > new Date().getTime()) {
      this.error = { text: 'Time from the future' }
      return
    }
    this.error = { text: null }

    const dt = this.day.getTime() / 1000 + new Date().getHours() * 3600

    const url = new URL(
      'https://api.openweathermap.org/data/2.5/onecall/timemachine'
    )

    url.search = String(
      new URLSearchParams({
        lat: `${this.coordinates.latitude}`,
        lon: `${this.coordinates.longitude}`,
        dt: `${dt}`,
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
        const newDay: IWeatherDay = {
          time: data.current.dt,
          temperature: data.current.temp,
          icon: data.current.weather[0].icon
        }
        runInAction(() => {
          this.data = newDay
        })
      })
      .catch(() => {
        if (!this.error.text) {
          this.error = { text: 'Fetch error. Check your internet connection and try again' }
        }
      })
  }
}

export const weatherArchive = new WeatherArchiveStore()
