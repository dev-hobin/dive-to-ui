import { assign, createMachine } from 'xstate'

export type MachineContext = {
  name: string | undefined
  selectedValue: string | undefined
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
          'ITEM.SELECT': {
            actions: ['setSelectedValue'],
          },
        },
      },
    },
    types: {
      context: {} as MachineContext,
      events: {} as { type: 'ITEM.FOCUS'; value: string } | { type: 'ITEM.SELECT'; value: string },
    },
    context: ({ input }) => ({
      name: input.name,
      selectedValue: undefined,
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
      setSelectedValue: assign(({ event }) => {
        if (event.type === 'ITEM.SELECT') {
          return { selectedValue: event.value }
        }
        return {}
      }),
    },
  },
)
