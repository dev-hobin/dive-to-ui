import { ReactNode, useEffect } from 'react'
import { useActorRef, useSelector } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { ActorContext } from './checkbox.context'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'

type RootProps = {
  children: ReactNode
  checked?: boolean
  onCheckedChange?: (checked: CheckedState) => void
  disabled?: boolean
  required?: boolean
}
export const Root = ({ children, disabled, checked, required, onCheckedChange }: RootProps) => {
  const actorRef = useActorRef(machine, {
    input: {
      disabled,
      required,
      checkedState: checked ? 'checked' : 'unchecked',
      onChange: (checked: CheckedState) => onCheckedChange?.(checked),
    },
  })

  const context = useSelector(actorRef, (state) => state.context)
  const state = useSelector(actorRef, (state) => state.value)

  useEffect(() => {
    if (disabled === undefined) return

    actorRef.send({ type: 'SET_DISABLED', payload: { disabled } })
  }, [actorRef, disabled])

  useEffect(() => {
    if (required === undefined) return

    actorRef.send({ type: 'SET_REQUIRED', payload: { required } })
  }, [actorRef, required])

  useEffect(() => {
    if (checked === undefined) return
    if (checked && context.checkedState === 'checked') return
    if (!checked && context.checkedState === 'unchecked') return

    if (checked) {
      actorRef.send({ type: 'SET_CHECKED' })
    } else {
      actorRef.send({ type: 'SET_UNCHECKED' })
    }
  }, [actorRef, checked, context.checkedState])

  console.log('state', state)
  console.log('context', context)

  return <ActorContext.Provider value={actorRef}>{children}</ActorContext.Provider>
}
