import { useActor } from '@xstate/react'
import { machine, type MachineContext } from '@/machines/radio-group'

export type UseRadioGroupReturn = {}

export const useRadioGroup = (props: Partial<MachineContext>): UseRadioGroupReturn => {
  const [state, send, actorRef] = useActor(machine, {
    input: {},
  })

  return {}
}
