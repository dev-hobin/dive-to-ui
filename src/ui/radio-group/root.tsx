import { machine } from '@/machines/radio-group'
import { useMachine } from '@xstate/react'
import { ReactNode, useEffect } from 'react'
import { MachineContext } from './context'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { type Context as RadioGroupMachineContext } from '@/machines/radio-group/radio-group.machine'

type RootProps = {
  children: ReactNode
  id: string
  name?: string
  required?: boolean
  disabled?: boolean
  value?: string
  defaultValue?: string
}
export const Root = forwardRefWithAsChild<'div', RootProps>((props, ref) => {
  const [state, send, service] = useMachine(machine, {
    context: {
      id: props.id,
      name: props.name ?? '',
      required: props.required ?? false,
      disabled: props.disabled ?? false,
      value: props.value ?? '',
      defaultValue: props.defaultValue ?? '',
    },
  })

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      console.log(state.context)
    })

    return subscription.unsubscribe
  }, [service])

  useEffect(() => {
    const context: Partial<RadioGroupMachineContext> = {}
    if (props.id !== undefined) context.id = props.id
    if (props.name !== undefined) context.name = props.name
    if (props.required !== undefined) context.required = props.required
    if (props.disabled !== undefined) context.disabled = props.disabled
    if (props.value !== undefined) context.value = props.value
    if (props.defaultValue !== undefined) context.value = props.defaultValue
    send({ type: 'CONTEXT.SET', payload: { context } })
  }, [props.defaultValue, props.disabled, props.id, props.name, props.required, props.value, send])

  return (
    <MachineContext.Provider value={service}>
      <Dive.div role="radiogroup" {...props} ref={ref}>
        {props.children}
      </Dive.div>
    </MachineContext.Provider>
  )
})
