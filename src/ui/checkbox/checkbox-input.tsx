import { useContext } from 'react'
import { useSelector } from '@xstate/react'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { ActorContext } from './checkbox.context'

export const Input = forwardRefWithAsChild<'input'>((props, forwardedRef) => {
  const actorRef = useContext(ActorContext)!
  const state = useSelector(actorRef, (state) => state)

  return (
    <Dive.input
      {...props}
      type="checkbox"
      onChange={() => actorRef.send({ type: 'CHECK' })}
      ref={forwardedRef}
    />
  )
})
