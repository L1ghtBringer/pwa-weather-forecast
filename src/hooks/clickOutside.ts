import { useCallback, useEffect, useRef } from 'react'

type Handler = (event: Event) => void

export const useClickOutside = <T extends Element>(handler: Handler): React.RefObject<T> => {
  const myRef = useRef<T>(null)

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (!(myRef.current as any).contains(event.target)) {
        handler(event)
      }
    },
    [handler]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside, false)
  }, [handleClickOutside])

  return myRef
}
