import { forwardRef, InputHTMLAttributes, useContext, useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { ActorContext } from './checkbox.context'
import { composeRefs } from '@/utils/compose-refs'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const actorRef = useContext(ActorContext)!
  const state = useSelector(actorRef, (state) => state)
  const context = state.context

  const innerRef = useRef<HTMLInputElement | null>(null)
  const composedRef = composeRefs(forwardedRef, innerRef)

  return (
    <input
      {...props}
      ref={composedRef}
      id={context.id}
      type="checkbox"
      aria-hidden
      tabIndex={-1}
      onChange={(ev) => {
        actorRef.send({
          type: 'INPUT.CHANGE',
          payload: {
            checked: ev.target.checked,
            indeterminate: ev.target.indeterminate,
          },
        })
      }}
      disabled={context.disabled}
      required={context.required}
      defaultChecked={state.matches({ checkedState: 'checked' })}
    />
  )
})

Input.displayName = 'Input'
