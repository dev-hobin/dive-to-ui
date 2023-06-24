import { forwardRef, InputHTMLAttributes, useContext } from 'react'
import { MachineContext } from './context'
import { useSelector } from '@xstate/react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const actorRef = useContext(MachineContext)!
  const state = useSelector(actorRef, (state) => state)
  const context = state.context
  const send = actorRef.send

  return (
    <input
      id={context.id}
      name={context.name}
      type="checkbox"
      tabIndex={-1}
      onChange={(ev) => {
        if (ev.target.indeterminate) {
          send({ type: 'INPUT.CHECK', value: 'indeterminate' })
        } else {
          send({ type: 'INPUT.CHECK', value: ev.target.checked ? 'checked' : 'unchecked' })
        }
      }}
      {...props}
      ref={ref}
    />
  )
})

Input.displayName = 'Checkbox.Input'
