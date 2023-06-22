import { forwardRef, InputHTMLAttributes, useContext, useRef } from 'react'
import { MachineContext } from './context'
import { useActor } from '@xstate/react'

import { type Assign } from '@/types'

type InputProps = Assign<InputHTMLAttributes<HTMLInputElement>, { value: string }>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, value, disabled, required, ...rest } = props
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)
  const context = state.context

  const isDisabled = context.disabled || context.itemMap[value]?.disabled
  const isRequired = context.required || required || context.itemMap[value]?.required
  const isChecked = context.defaultValue === value || context.value === value

  return (
    <input
      id={value}
      type="radio"
      tabIndex={-1}
      name={context.name}
      disabled={isDisabled}
      required={isRequired}
      defaultChecked={isChecked}
      onChange={(ev) => send({ type: 'ITEM.SELECT.INPUT', payload: { value } })}
      {...rest}
      ref={ref}
    />
  )
})

Input.displayName = 'Checkbox.Input'
