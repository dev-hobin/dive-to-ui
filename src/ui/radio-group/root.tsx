import { machine } from '@/machines/radio-group'
import { useMachine } from '@xstate/react'
import { ReactNode, useEffect } from 'react'
import { MachineContext } from './context'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'

type RootProps = {
  children: ReactNode
  id: string
}
export const Root = forwardRefWithAsChild<'div', RootProps>((props, ref) => {
  const [state, send, service] = useMachine(machine, {
    context: {},
  })

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      console.log(state.context)
    })

    return subscription.unsubscribe
  }, [service])

  return (
    <MachineContext.Provider value={service}>
      <Dive.div role="radiogroup" {...props} ref={ref}>
        {props.children}
      </Dive.div>
    </MachineContext.Provider>
  )
})
