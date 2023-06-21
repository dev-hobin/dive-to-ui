import { forwardRef, InputHTMLAttributes, useContext, useRef } from 'react'
import { MachineContext } from './context'
import { useActor } from '@xstate/react'

import { type Assign } from '@/types'

type InputProps = Assign<InputHTMLAttributes<HTMLInputElement>, { value: string }>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, value, disabled, required, readOnly, defaultChecked, checked, ...rest } = props
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)
  const context = state.context

  const isDisabled = context.disabled || disabled || context.itemMap[value]?.disabled
  const isRequired = context.required || required || context.itemMap[value]?.required
  const isChecked = checked || context.defaultValue === value || context.value === value

  return (
    <input
      id={value}
      type="radio"
      aria-hidden
      tabIndex={-1}
      disabled={isDisabled}
      required={isRequired}
      defaultChecked={isChecked}
      {...rest}
      ref={ref}
    />
  )
})

Input.displayName = 'Checkbox.Input'
