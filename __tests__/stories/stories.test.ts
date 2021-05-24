import { WeatherForecastStore } from '../../src/store/weatherForecast'
import { WeatherArchiveStore } from '../../src/store/weatherArchive'
import { weekResponse, archiveResponse } from './fetchResponse'
import MockDate from 'mockdate'

const mockFetch = (data: any, jsonData: any) => {
  const mockSuccessResponse = data
  const mockJsonPromise = Promise.resolve(mockSuccessResponse)
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    ...jsonData,
  })
  return jest.fn().mockImplementation(() => mockFetchPromise)
}

var globalRef: any = global

describe('WeatherForecastStore', () => {
  it('Creates new store', () => {
    const store = new WeatherForecastStore()
    expect(store.data.length).toBe(0)
    expect(store.coordinates.latitude).toBeNull()
    expect(store.error.text).toBeNull()
    expect(store.coordinates.longitude).toBeNull()
  })

  it('Set coordinates', () => {
    const store = new WeatherForecastStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    store.setCoordinates(newCoordinates)
    expect(store.data.length).toBe(0)
    expect(store.error.text).toBeNull()
    expect(store.coordinates).toEqual(newCoordinates)
  })

  it('Null params fetch', async () => {
    const store = new WeatherForecastStore()
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.data.length).toBe(0)
    expect(store.error.text).toBeNull()
    expect(store.coordinates.latitude).toBeNull()
    expect(store.coordinates.longitude).toBeNull()
  })

  it('Set coordinates and fetch lost', async () => {
    const store = new WeatherForecastStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    store.setCoordinates(newCoordinates)
    globalRef.fetch = jest.fn().mockImplementation(() => {
      throw new Error('Error')
    })
    await expect(store.fetchForecast()).rejects.toEqual(new Error('Error'))
    expect(store.data.length).toBe(0)
    expect(store.coordinates).toEqual(newCoordinates)
  })

  it('Set coordinates and fetch lost: response false', async () => {
    const store = new WeatherForecastStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    store.setCoordinates(newCoordinates)
    globalRef.fetch = mockFetch(null, { ok: false })
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.data.length).toBe(0)
    expect(store.error.text).toBe(
      'Fetch error. Check your internet connection and try again'
    )
    expect(store.coordinates).toEqual(newCoordinates)
  })

  it('Set coordinates and fetch lost: 401 status', async () => {
    const store = new WeatherForecastStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    store.setCoordinates(newCoordinates)
    globalRef.fetch = mockFetch(null, { ok: false, status: 401 })
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.data.length).toBe(0)
    expect(store.error.text).toBe('Invalid API key. Write to developer')
    expect(store.coordinates).toEqual(newCoordinates)
  })

  it('Set coordinates and fetch lost: 400 status', async () => {
    const store = new WeatherForecastStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    store.setCoordinates(newCoordinates)
    globalRef.fetch = mockFetch(null, { ok: false, status: 400 })
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.data.length).toBe(0)
    expect(store.error.text).toBe('Invalid data to send. Write to developer')
    expect(store.coordinates).toEqual(newCoordinates)
  })

  it('Set coordinates and fetch success', async () => {
    const store = new WeatherForecastStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    store.setCoordinates(newCoordinates)
    globalRef.fetch = mockFetch(weekResponse, { ok: true })
    await store.fetchForecast()
    expect(store.coordinates).toEqual(newCoordinates)
    expect(store.data.length).toBe(7)
    store.data.forEach((element, index) =>
      expect(element).toEqual({
        time: weekResponse.daily[index + 1].dt,
        temperature: weekResponse.daily[index + 1].temp.day,
        icon: weekResponse.daily[index + 1].weather[0].icon,
      })
    )
  })
})

describe('WeatherArchiveStore', () => {
  it('Creates new store', () => {
    const store = new WeatherArchiveStore()
    expect(store.data).toBeNull()
    expect(store.day).toBeNull()
    expect(store.error.text).toBeNull()
    expect(store.coordinates.latitude).toBeNull()
    expect(store.coordinates.longitude).toBeNull()
  })

  it('Set coordinates', () => {
    const store = new WeatherArchiveStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    store.setCoordinates(newCoordinates)
    expect(store.data).toBeNull()
    expect(store.day).toBeNull()
    expect(store.error.text).toBeNull()
    expect(store.coordinates).toEqual(newCoordinates)
  })

  it('Set day', () => {
    const store = new WeatherArchiveStore()
    const day = new Date()
    store.setDay(day)
    expect(store.data).toBeNull()
    expect(store.day).toEqual(day)
    expect(store.error.text).toBeNull()
    expect(store.coordinates.latitude).toBeNull()
    expect(store.coordinates.longitude).toBeNull()
  })

  it('Null params fetch', async () => {
    const store = new WeatherArchiveStore()
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.data).toBeNull()
    expect(store.day).toBeNull()
    expect(store.error.text).toBeNull()
    expect(store.coordinates.latitude).toBeNull()
    expect(store.coordinates.longitude).toBeNull()
  })

  it('Time from the future', async () => {
    const store = new WeatherArchiveStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    const day = new Date(1487076208001)
    store.setDay(day)
    MockDate.set(1487076208000)
    store.setCoordinates(newCoordinates)
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.coordinates).toEqual(newCoordinates)
    expect(store.error.text).toBe('Time from the future')
    expect(store.data).toBeNull()
    expect(store.day).toEqual(day)
    MockDate.reset()
  })

  it('Set coordinates and fetch lost', async () => {
    const store = new WeatherArchiveStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    const day = new Date(1487076208000)
    store.setDay(day)
    store.setCoordinates(newCoordinates)
    MockDate.set(1487076208000)
    globalRef.fetch = jest.fn().mockImplementation(() => {
      throw new Error('Error')
    })
    await expect(store.fetchForecast()).rejects.toEqual(new Error('Error'))
    expect(store.data).toBeNull()
    expect(store.coordinates).toEqual(newCoordinates)
    expect(store.day).toEqual(day)
    MockDate.reset()
  })

  it('Set coordinates and fetch lost: response false', async () => {
    const store = new WeatherArchiveStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    const day = new Date(1487076208000)
    store.setDay(day)
    store.setCoordinates(newCoordinates)
    MockDate.set(1487076208000)
    globalRef.fetch = mockFetch(null, { ok: false })
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.error.text).toBe(
      'Fetch error. Check your internet connection and try again'
    )
    expect(store.data).toBeNull()
    expect(store.coordinates).toEqual(newCoordinates)
    expect(store.day).toEqual(day)
    MockDate.reset()
  })

  it('Set coordinates and fetch lost: 401 status', async () => {
    const store = new WeatherArchiveStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    const day = new Date(1487076208000)
    store.setDay(day)
    store.setCoordinates(newCoordinates)
    MockDate.set(1487076208000)
    globalRef.fetch = mockFetch(null, { ok: false, status: 401 })
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.error.text).toBe('Invalid API key. Write to developer')
    expect(store.data).toBeNull()
    expect(store.coordinates).toEqual(newCoordinates)
    expect(store.day).toEqual(day)
    MockDate.reset()
  })

  it('Set coordinates and fetch lost: 400 status', async () => {
    const store = new WeatherArchiveStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    const day = new Date(1487076208000)
    store.setDay(day)
    store.setCoordinates(newCoordinates)
    MockDate.set(1487076208000)
    globalRef.fetch = mockFetch(null, { ok: false, status: 400 })
    await expect(store.fetchForecast()).resolves.toEqual(undefined)
    expect(store.error.text).toBe('Invalid data to send. Write to developer')
    expect(store.data).toBeNull()
    expect(store.coordinates).toEqual(newCoordinates)
    expect(store.day).toEqual(day)
    MockDate.reset()
  })

  it('Set coordinates/day and fetch success', async () => {
    const store = new WeatherArchiveStore()
    const newCoordinates = {
      latitude: 55.796127,
      longitude: 49.106405,
    }
    const day = new Date(1487076208000)
    store.setDay(day)
    store.setCoordinates(newCoordinates)
    MockDate.set(1487076208000)
    globalRef.fetch = mockFetch(archiveResponse, { ok: true })
    await store.fetchForecast()
    expect(store.coordinates).toEqual(newCoordinates)
    expect(store.day).toEqual(day)
    expect(store.error.text).toBeNull()
    expect(store.data).toEqual({
      time: archiveResponse.current.dt,
      temperature: archiveResponse.current.temp,
      icon: archiveResponse.current.weather[0].icon,
    })
  })
})
