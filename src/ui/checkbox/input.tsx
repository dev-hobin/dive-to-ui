import { forwardRef, InputHTMLAttributes, useContext, useRef } from 'react'
import { MachineContext } from './context'
import { useActor } from '@xstate/react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, disabled, required, readOnly, defaultChecked, ...rest } = props
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)
  const context = state.context

  const isDisabled = disabled || context.disabled
  const isRequired = required || context.required
  const isDefaultChecked = defaultChecked || context.checked === 'checked'

  return (
    <input
      id={id || context.id}
      type="checkbox"
      aria-hidden
      tabIndex={-1}
      disabled={isDisabled}
      required={isRequired}
      defaultChecked={isDefaultChecked}
      {...rest}
      ref={ref}
    />
  )
})

Input.displayName = 'Checkbox.Input'
