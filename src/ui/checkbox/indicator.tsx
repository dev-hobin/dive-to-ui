import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { useContext } from 'react'
import { MachineContext } from './context'

export const Indicator = forwardRefWithAsChild<'button'>((props, ref) => {
  const actorRef = useContext(MachineContext)!
  const send = actorRef.send

  return (
    <Dive.button
      type="button"
      tabIndex={0}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter') {
          ev.preventDefault()
        }
      }}
      onClick={(ev) => send({ type: 'CHECK' })}
      {...props}
      ref={ref}
    />
  )
})
