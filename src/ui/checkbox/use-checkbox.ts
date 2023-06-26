import { useActor } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { Context } from '@/machines/checkbox/checkbox.machine'
import { useEffect } from 'react'

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>

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
    indicatorProps: {
      type: 'button',
      tabIndex: 0,
      onKeyDown(ev) {
        if (ev.key === 'Enter') {
          ev.preventDefault()
        }
      },
      onClick() {
        send({ type: 'CHECK' })
      },
    } as React.ComponentProps<'button'>,
    inputProps: {
      id,
      name,
      type: 'checkbox',
      tabIndex: -1,
      'aria-hidden': true,
      onChange(ev) {
        if (ev.target.indeterminate) {
          send({ type: 'INPUT.CHECK', value: 'indeterminate' })
        } else {
          send({ type: 'INPUT.CHECK', value: ev.target.checked ? 'checked' : 'unchecked' })
        }
      },
    } as React.ComponentProps<'input'>,
  }
}
