import { useContext } from 'react'
import { useActor } from '@xstate/react'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { MachineContext } from './context'

export const Indicator = forwardRefWithAsChild<'button'>((props, ref) => {
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)

  console.log(state.context)

  return <Dive.button {...props} onClick={(ev) => send({ type: 'CHECK' })} ref={ref} />
})
