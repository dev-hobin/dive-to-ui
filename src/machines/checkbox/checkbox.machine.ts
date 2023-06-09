import { raise, and, assign, createMachine, not } from 'xstate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'idle',
    states: {
      idle: {},
    },
    // @ts-ignore
    on: {
      'CHECKED.SET': {
        guard: not('isDisabled'),
        actions: 'setChecked',
      },
    },
    types: {
      context: {} as {
        checked: boolean
        disabled: boolean
        required: boolean
        value: string
        name: string
      },
      events: {} as { type: 'CHECKED.SET'; payload: { checked: boolean } },
    },
    context: ({ input }) => ({
      checked: input?.checked ?? false,
      disabled: input?.disabled ?? false,
      required: input?.required ?? false,
      name: input?.name ?? '',
      value: input?.value ?? 'on',
    }),
  },
  {
    actions: {
      setChecked: assign(({ event, context }) => {
        if (event.type !== 'CHECKED.SET') return context
        return { checked: event.payload.checked }
      }),
    },
    guards: {
      isDisabled: ({ context }) => context.disabled,
    },
  },
)
