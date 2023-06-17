import { ReactNode, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'
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
  const [_, send, service] = useMachine(machine, {
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
    if (props.checked === undefined) return
    send({ type: 'CHECKED.SET', value: props.checked })
  }, [props.checked, send])

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      onCheckedChange(state.context.checked)
    })

    return subscription.unsubscribe
  }, [onCheckedChange, service])

  return <MachineContext.Provider value={service}>{props.children}</MachineContext.Provider>
}
