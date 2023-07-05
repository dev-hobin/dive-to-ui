import { assign, createMachine } from 'xstate'

export type MachineContext = {
  name: string | undefined
  focusedValue: string | undefined
}

export const machine = createMachine(
  {
    id: 'RadioGroup',
    initial: 'idle',
    states: {
      idle: {
        on: {
          'ITEM.FOCUS': {
            actions: ['setFocusedValue'],
          },
        },
      },
    },
    types: {
      context: {} as MachineContext,
      events: {} as { type: 'ITEM.FOCUS'; value: string },
    },
    context: ({ input }) => ({
      name: input.name,
      focusedValue: undefined,
    }),
  },
  {
    actions: {
      setFocusedValue: assign(({ event }) => {
        if (event.type === 'ITEM.FOCUS') {
          return { focusedValue: event.value }
        }
        return {}
      }),
    },
  },
)
