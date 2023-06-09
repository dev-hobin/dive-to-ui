import { createMachine } from 'xstate'

export const machine = createMachine({
  id: 'Checkbox',
  initial: 'idle',
  states: {
    idle: {},
  },
})
