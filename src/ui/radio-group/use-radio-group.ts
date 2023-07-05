import { useActor } from '@xstate/react'
import { machine, type MachineContext } from '@/machines/radio-group'
import { useCallback } from 'react'

export type UseRadioGroupReturn = {
  getInputProps: (value: string) => React.ComponentProps<'input'>
}

export const useRadioGroup = (props: Partial<MachineContext>): UseRadioGroupReturn => {
  const [state, send, actorRef] = useActor(machine, {
    input: {
      name: props.name,
    },
  })

  console.log(state.context)

  return {
    getInputProps(value) {
      return {
        type: 'radio',
        name: state.context.name,
        value: value,
        onFocus(ev) {
          send({ type: 'ITEM.FOCUS', value: ev.target.value })
        },
        onChange(ev) {
          if (ev.target.checked) {
            send({ type: 'ITEM.SELECT', value: ev.target.value })
          }
        },
      }
    },
  }
}
