import { useEffect } from 'react'
import { useCallbackRef } from './use-callback-ref'

export const useSync = <TState>(
  a: TState,
  b: TState,
  syncLogic: (a: TState, b: TState) => void,
) => {
  const sync = useCallbackRef(syncLogic)
  useEffect(() => {
    if (a === b) return
    sync(a, b)
  }, [a, b, sync])
}
