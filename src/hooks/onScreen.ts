import { useEffect, useRef, useState } from 'react'

export const useOnScreen = <T extends Element>(
  rootMargin: string = '0px'
): [React.RefObject<T>, boolean] => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  const ref = useRef<T>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin
      }
    )
    const current = ref.current
    if (current) {
      observer.observe(current)
    }
    return () => {
      observer.unobserve(current!)
    }
  }, [ref, rootMargin])
  return [ref, isIntersecting]
}
