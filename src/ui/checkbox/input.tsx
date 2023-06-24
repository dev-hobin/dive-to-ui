import { forwardRef, InputHTMLAttributes, useContext } from 'react'
import { MachineContext } from './context'
import { useSelector } from '@xstate/react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, disabled, required, defaultChecked, ...rest } = props
  const actorRef = useContext(MachineContext)!
  const state = useSelector(actorRef, (state) => state)
  const send = actorRef.send
  const context = state.context

  const isDisabled = disabled || context.disabled
  const isRequired = required || context.required
  const isDefaultChecked = defaultChecked || context.checked === 'checked'

  return (
    <input
      id={context.id}
      type="checkbox"
      aria-hidden
      name={context.name}
      tabIndex={-1}
      disabled={isDisabled}
      required={isRequired}
      defaultChecked={isDefaultChecked}
      onChange={(ev) => {
        if (ev.currentTarget.indeterminate) {
          send({ type: 'CHECKED.SET', value: 'indeterminate' })
        } else {
          if (ev.currentTarget.checked) {
            send({ type: 'CHECKED.SET', value: 'checked' })
          } else {
            send({ type: 'CHECKED.SET', value: 'unchecked' })
          }
        }
      }}
      {...rest}
      ref={ref}
    />
  )
})

Input.displayName = 'Checkbox.Input'
