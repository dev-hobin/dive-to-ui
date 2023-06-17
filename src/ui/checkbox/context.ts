import { createActorContext } from '@xstate/react'
import { machine } from '../../machines/checkbox'

export const MachineContext = createActorContext(machine)
