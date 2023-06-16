import { useContext } from 'react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { ActorContext } from './checkbox.context'
import { useSelector } from '@xstate/react'

export const Indicator = forwardRefWithAsChild<'button'>((props, forwardedRef) => {
  const actorRef = useContext(ActorContext)!
  const state = useSelector(actorRef, (state) => state)
  const context = state.context

  return (
    <Dive.button
      role="checkbox"
      type="button"
      aria-checked={state.matches({ checkedState: 'checked' })}
      aria-required={context.required}
      disabled={context.disabled}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter') ev.preventDefault()
      }}
      onClick={() => actorRef.send({ type: 'CHECK' })}
      {...props}
      ref={forwardedRef}
    />
  )
})
