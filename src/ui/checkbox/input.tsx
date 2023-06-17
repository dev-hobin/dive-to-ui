import { forwardRef, InputHTMLAttributes, useContext, useRef } from 'react'
import { MachineContext } from './context'
import { useActor } from '@xstate/react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)
  const context = state.context

  console.log('input checked', context.checked)
  console.log('input context', context)
  return (
    <input
      {...props}
      ref={ref}
      id={context.id}
      type="checkbox"
      aria-hidden
      tabIndex={-1}
      disabled={context.disabled}
      required={context.required}
      defaultChecked={context.checked === 'checked'}
    />
  )
})

Input.displayName = 'Checkbox.Input'
