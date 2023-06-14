import { ReactNode, useEffect } from 'react'
import { useActorRef, useSelector } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { ActorContext } from './checkbox.context'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'
import { useControllableState } from '@/hooks/use-controllable-state'
import { useSync } from '@/hooks/use-sync'

type RootProps = {
  children: ReactNode
  checked?: boolean
  onCheckedChange?: (checked: CheckedState) => void
  disabled?: boolean
  required?: boolean
}
export const Root = (props: RootProps) => {
  const [checkedState, setCheckedState] = useControllableState({
    value: props.checked ? 'checked' : 'unchecked',
    onChange: props.onCheckedChange,
  })
  const [disabled, setDisabled] = useControllableState({
    value: props.disabled,
    defaultValue: false,
  })
  const [required, setRequired] = useControllableState({
    value: props.required,
    defaultValue: false,
  })

  const actorRef = useActorRef(machine, {
    input: {
      disabled,
      required,
      checkedState,
    },
  })

  const context = useSelector(actorRef, (state) => state.context)

  useEffect(() => {
    const subscription = actorRef.subscribe((next) => {
      setCheckedState(next.context.checkedState)
      setDisabled(next.context.disabled)
      setRequired(next.context.required)
    })

    return () => subscription.unsubscribe()
  }, [actorRef, setCheckedState, setDisabled, setRequired])

  useSync(context.checkedState, checkedState, (_, checkedState) => {
    switch (checkedState) {
      case 'checked':
        actorRef.send({ type: 'SET_CHECKED' })
        break
      case 'unchecked':
        actorRef.send({ type: 'SET_UNCHECKED' })
        break
      case 'indeterminate':
        actorRef.send({ type: 'SET_INDETERMINATE' })
      default:
        break
    }
  })
  useSync(context.disabled, disabled, (_, disabled) => {
    actorRef.send({ type: 'SET_DISABLED', payload: { disabled } })
  })
  useSync(context.required, required, (_, required) => {
    actorRef.send({ type: 'SET_REQUIRED', payload: { required } })
  })

  return <ActorContext.Provider value={actorRef}>{props.children}</ActorContext.Provider>
}
