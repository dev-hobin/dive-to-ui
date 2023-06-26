import { useActor } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { Context } from '@/machines/checkbox/checkbox.machine'
import { useEffect } from 'react'

export const useCheckbox = (props: Context) => {
  const [state, send, actorRef] = useActor(machine, {
    input: {
      id: props.id,
      name: props.name,
      checked: props.checkedState,
      onCheckedChange: props.onCheckedChange,
    },
  })

  const id = state.context.id
  const name = state.context.name
  const checkedState = state.context.checkedState
  const isChecked = checkedState === 'checked'
  const isIndeterminate = checkedState === 'indeterminate'
  const isUnchecked = checkedState === 'unchecked'

  useEffect(() => {
    const snapshot = actorRef.getSnapshot()
    if (!snapshot) return

    const nextCheckedState = props.checkedState
    if (snapshot.context.checkedState !== nextCheckedState) {
      send({ type: 'CHECKED.SET', value: nextCheckedState })
    }
  }, [actorRef, props.checkedState, send])

  useEffect(() => {
    if (props.id === undefined) return
    send({ type: 'CONTEXT.SET', context: { id: props.id } })
  }, [props.id, send])

  useEffect(() => {
    if (props.name === undefined) return
    send({ type: 'CONTEXT.SET', context: { name: props.name } })
  }, [props.name, send])

  useEffect(() => {
    if (props.onCheckedChange === undefined) return
    send({ type: 'CONTEXT.SET', context: { onCheckedChange: props.onCheckedChange } })
  }, [props.onCheckedChange, send])

  return {
    state,
    actorRef,
  }
}
