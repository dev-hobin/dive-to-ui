import { createMachine, assign } from 'xstate'

export const machine = createMachine({
  id: 'RadioGroup',
  initial: 'idle',
  states: {
    idle: {},
  },
  types: {
    context: {} as any,
    events: {} as any,
  },
})
