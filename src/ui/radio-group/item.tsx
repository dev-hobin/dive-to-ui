import { useContext, useEffect, useLayoutEffect } from 'react'
import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { MachineContext } from './context'

type ItemProps = {
  value: string
  required?: boolean
}
export const Item = forwardRefWithAsChild<'button', ItemProps>((props, ref) => {
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)
  const context = state.context

  const { value, disabled, required, ...rest } = props

  useLayoutEffect(() => {
    send({
      type: 'ITEM.REGISTER',
      payload: {
        item: {
          value: value,
          disabled: disabled ?? false,
          required: required ?? false,
        },
      },
    })

    return () => {
      send({ type: 'ITEM.UNREGISTER', payload: { value: value } })
    }
  }, [disabled, required, value, send])

  console.log('render')
  console.log(state.context.itemMap[value])

  const isDisabled = context.disabled || disabled || context.itemMap[value]?.disabled
  const isChecked = context.defaultValue === value || context.value === value
  const isTabbable = !context.value || context.value === value

  return (
    <Dive.button
      role="radio"
      aria-checked={isChecked}
      value={value}
      disabled={isDisabled}
      onClick={() => send({ type: 'ITEM.SELECT', payload: { value: value } })}
      tabIndex={isTabbable ? 0 : -1}
      {...rest}
      ref={ref}
    >
      {props.children}
    </Dive.button>
  )
})
