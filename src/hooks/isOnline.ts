import { useState, useEffect } from 'react'

const getOnlineStatus = (): boolean => {
  return typeof navigator !== 'undefined' &&
    typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true
}

export const useIsOnline = (): boolean => {
  const [online, setOnline] = useState<boolean>(getOnlineStatus())

  useEffect(() => {
    window.addEventListener('online', (event) => setOnline(true), false)
    window.addEventListener('offline', (event) => setOnline(false), false)
    return () => {
      window.removeEventListener('online', (event) => setOnline(true), false)
      window.removeEventListener('offline', (event) => setOnline(false), false)
    }
  }, [])

  return online
}
