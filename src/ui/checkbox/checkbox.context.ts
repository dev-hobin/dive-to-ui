import { machine } from '@/machines/checkbox'
import { createActorContext } from '@xstate/react'

export const CheckboxMachineContext = createActorContext(machine)
