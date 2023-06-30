import { createMachine } from 'xstate'

export type MachineContext = {}

export const machine = createMachine({
  id: 'RadioGroup',
  initial: 'idle',
  states: {
    idle: {},
  },
  types: {
    context: {} as MachineContext,
    events: {} as any,
  },
})
