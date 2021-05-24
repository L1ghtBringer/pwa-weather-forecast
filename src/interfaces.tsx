export interface IWeatherDay {
  time: number
  temperature: number
  icon: string
}

export interface ICoordinates {
  latitude: number | null
  longitude: number | null
}

interface IBaseStore {
  coordinates: ICoordinates
  setCoordinates: (coordinates: ICoordinates) => void
  fetchForecast: () => void
  error: Error
}

export interface Error {
  text: null | string
}

export interface IWeatherForecastStore extends IBaseStore {
  data: IWeatherDay[]
}

export interface IWeatherArchiveStore extends IBaseStore {
  data: IWeatherDay | null
  day: Date | null
  setDay: (day: Date) => void
}
