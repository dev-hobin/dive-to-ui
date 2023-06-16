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

  useEffect(() => {
    if (!innerRef.current) return
    const input = innerRef.current

    if (context.checkedState === 'indeterminate') {
      input.indeterminate = true
    } else {
      input.indeterminate = false
    }
  }, [context.checkedState])

  useEffect(() => {
    if (!innerRef.current) return
    if (!context.previousCheckedState) return

    const input = innerRef.current
    const inputProto = window.HTMLInputElement.prototype
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
    const setChecked = descriptor.set

    if (context.checkedState !== context.previousCheckedState && setChecked) {
      const event = new Event('click', { bubbles: true })
      input.indeterminate = context.checkedState === 'indeterminate' ? true : false
      setChecked.call(input, context.checkedState == 'unchecked' ? false : true)
      input.dispatchEvent(event)
    }
  }, [context.checkedState, context.previousCheckedState])

  return (
    <input
      {...props}
      ref={composedRef}
      type="checkbox"
      aria-hidden
      tabIndex={-1}
      disabled={context.disabled}
      required={context.required}
      defaultChecked={state.matches({ checkedState: 'checked' })}
    />
  )
})

Input.displayName = 'Input'
