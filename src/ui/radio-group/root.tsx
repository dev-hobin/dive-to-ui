import { machine } from '@/machines/radio-group'
import { useMachine } from '@xstate/react'
import { ReactNode, useEffect } from 'react'
import { MachineContext } from './context'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { type Context as RadioGroupMachineContext } from '@/machines/radio-group/radio-group.machine'
import { useCallbackRef } from '@/hooks/use-callback-ref'

type RootProps = {
  children: ReactNode
  id: string
  name?: string
  required?: boolean
  disabled?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}
export const Root = forwardRefWithAsChild<'div', RootProps>((props, ref) => {
  const {
    id,
    name,
    required,
    disabled,
    value,
    defaultValue,
    onValueChange = () => {},
    children,
    ...rest
  } = props
  const [state, send, service] = useMachine(machine, {
    context: {
      id: id,
      name: name ?? '',
      required: required ?? false,
      disabled: disabled ?? false,
      value: value ?? '',
      defaultValue: defaultValue ?? '',
    },
  })

  const dispatchValueChanged = useCallbackRef(onValueChange)

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      dispatchValueChanged(state.context.value)
    })

    return subscription.unsubscribe
  }, [dispatchValueChanged, service])

  useEffect(() => {
    const context: Partial<RadioGroupMachineContext> = {}
    if (id !== undefined) context.id = id
    if (name !== undefined) context.name = name
    if (required !== undefined) context.required = required
    if (disabled !== undefined) context.disabled = disabled
    if (defaultValue !== undefined) context.value = defaultValue
    send({ type: 'CONTEXT.SET', payload: { context } })
  }, [defaultValue, disabled, id, name, required, value, send])

  useEffect(() => {
    if (value === undefined) return
    send({ type: 'ITEM.SELECT', payload: { value: value } })
  }, [value, send])

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    switch (ev.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        send({ type: 'GOTO.PREV' })
        return
      case 'ArrowDown':
      case 'ArrowRight':
        send({ type: 'GOTO.NEXT' })
        return
      default:
        return
    }
  }

  console.log('CONTEXT', state.context)

  return (
    <MachineContext.Provider value={service}>
      <Dive.div role="radiogroup" id={id} onKeyDown={handleKeyDown} {...rest} ref={ref}>
        {children}
      </Dive.div>
    </MachineContext.Provider>
  )
})
