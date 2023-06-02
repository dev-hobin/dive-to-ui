import { useMachine } from '@xstate/react'
import { machine } from '@/machine/checkbox'

export const Checkbox = () => {
  const [state, send] = useMachine(machine)
  return <div>Checkbox</div>
}
