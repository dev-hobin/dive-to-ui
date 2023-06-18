import { ReactNode, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import {
  type CheckedState,
  type Context as CheckboxMachineContext,
} from '@/machines/checkbox/checkbox.machine'
import { useCallbackRef } from '@/hooks/use-callback-ref'
import { MachineContext } from './context'

type RootProps = {
  children: ReactNode
  id: string
  checked?: CheckedState
  onCheckedChange?: (checked: CheckedState) => void
  name?: string
  required?: boolean
  value?: string
  disabled?: boolean
}
export const Root = (props: RootProps) => {
  const [state, send, service] = useMachine(machine, {
    context: {
      checked: props.checked ?? 'unchecked',
      id: props.id,
      name: props.name ?? '',
      disabled: props.disabled ?? false,
      required: props.required ?? false,
      value: props.value ?? 'on',
    },
  })

  const onCheckedChange = useCallbackRef(props.onCheckedChange)

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      onCheckedChange(state.context.checked)
    })

    return subscription.unsubscribe
  }, [onCheckedChange, service])

  useEffect(() => {
    send({ type: 'CONTEXT.SET', value: { controlled: !!props.checked } })

    if (props.checked === undefined) return
    send({ type: 'CHECKED.SET', value: props.checked })
  }, [props.checked, send])

  useEffect(() => {
    const context: Partial<CheckboxMachineContext> = {}
    if (props.disabled !== undefined) context.disabled = props.disabled
    if (props.id !== undefined) context.id = props.id
    if (props.name !== undefined) context.name = props.name
    if (props.required !== undefined) context.required = props.required
    if (props.value !== undefined) context.value = props.value
    send({ type: 'CONTEXT.SET', value: context })
  }, [props.disabled, props.id, props.name, props.required, props.value, props.checked, send])

  return <MachineContext.Provider value={service}>{props.children}</MachineContext.Provider>
}
