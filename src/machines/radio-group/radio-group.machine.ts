import { createMachine } from 'xstate'

export type MachineContext = {
  name: string | undefined
}

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
  context: ({ input }) => ({
    name: input.name,
  }),
})
