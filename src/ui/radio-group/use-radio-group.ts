import { useActor } from '@xstate/react'
import { machine, type MachineContext } from '@/machines/radio-group'

export type UseRadioGroupReturn = {
  inputProps: React.ComponentProps<'input'>
}

export const useRadioGroup = (props: Partial<MachineContext>): UseRadioGroupReturn => {
  const [state, send, actorRef] = useActor(machine, {
    input: {
      name: props.name,
    },
  })

  console.log(state.context)

  return {
    inputProps: {
      name: state.context.name,
      onFocus(ev) {
        send({ type: 'ITEM.FOCUS', value: ev.target.value })
      },
    },
  }
}
