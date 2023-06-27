import { useActor } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { Context } from '@/machines/checkbox/checkbox.machine'
import { useEffect } from 'react'

export type UseCheckboxReturn = {
  indicatorProps: React.ComponentProps<'button'>
  inputProps: React.ComponentProps<'input'>
}

export const useCheckbox = (props: Partial<Context>): UseCheckboxReturn => {
  const [state, send, actorRef] = useActor(machine, {
    input: {
      id: props.id,
      name: props.name,
      checkedState: props.checkedState,
      onCheckedChange: props.onCheckedChange,
      value: props.value,
      disabled: props.disabled,
      required: props.required,
    },
  })

  const id = state.context.id
  const name = state.context.name
  const isDisabled = state.context.disabled
  const isRequired = state.context.required

  useEffect(() => {
    const snapshot = actorRef.getSnapshot()
    if (!snapshot) return

    const nextCheckedState = props.checkedState
    if (snapshot.context.checkedState !== nextCheckedState) {
      send({ type: 'CHECKED.SET', value: nextCheckedState })
      send({ type: 'CHECKED.SET', value: nextCheckedState ?? 'unchecked' })
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
    indicatorProps: {
      type: 'button',
      tabIndex: 0,
      disabled: isDisabled,

      onKeyDown(ev) {
        if (ev.key === 'Enter') {
          ev.preventDefault()
        }
      },
      onClick() {
        send({ type: 'CHECK' })
      },
    },
    inputProps: {
      id,
      name,
      type: 'checkbox',
      tabIndex: -1,
      'aria-hidden': true,
      disabled: isDisabled,
      required: isRequired,

      onChange(ev) {
        if (ev.target.indeterminate) {
          send({ type: 'INPUT.CHECK', value: 'indeterminate' })
        } else {
          send({ type: 'INPUT.CHECK', value: ev.target.checked ? 'checked' : 'unchecked' })
        }
      },
    },
  }
}
