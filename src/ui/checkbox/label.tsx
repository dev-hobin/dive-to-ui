import { useContext } from 'react'
import { useActor } from '@xstate/react'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { MachineContext } from './context'

export const Label = forwardRefWithAsChild<'label'>((props, ref) => {
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)

  return (
    <Dive.label
      htmlFor={state.context.id}
      onClick={(ev) => {
        ev.preventDefault()
        send({ type: 'CHECK' })
      }}
      {...props}
      ref={ref}
    />
  )
})
