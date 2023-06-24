import { useContext } from 'react'
import { useSelector } from '@xstate/react'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { MachineContext } from './context'

export const Indicator = forwardRefWithAsChild<'button'>((props, ref) => {
  const actorRef = useContext(MachineContext)!
  const state = useSelector(actorRef, (state) => state)
  const send = actorRef.send

  return (
    <Dive.button type="button" onClick={(ev) => send({ type: 'CHECK' })} {...props} ref={ref} />
  )
})
