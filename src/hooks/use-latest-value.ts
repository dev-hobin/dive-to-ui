import { useMemo, useRef } from 'react'

export const useLatestValue = <T>(value: T) => {
  const ref = useRef<T>(value)
  ref.current = value
  return useMemo(() => ref.current, [])
}
