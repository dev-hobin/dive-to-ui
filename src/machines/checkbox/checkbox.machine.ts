import { raise, and, assign, createMachine, not } from 'xstate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'idle',
    states: {
      idle: {},
    },
    on: {
      'CHECKED.SET': {
        guard: not('isDisabled'),
        actions: raise(({ event }) =>
          event.params.checked
            ? { type: 'CHECKED.SET.CHECKED' }
            : { type: 'CHECKED.SET.UNCHECKED' },
        ),
      },
      'CHECKED.SET.CHECKED': {
        actions: { type: 'setChecked', params: { checked: true } },
      },
      'CHECKED.SET.UNCHECKED': {
        actions: { type: 'setChecked', params: { checked: false } },
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
      events: {} as
        | { type: 'CHECKED.SET'; params: { checked: boolean } }
        | { type: 'CHECKED.SET.CHECKED' }
        | { type: 'CHECKED.SET.UNCHECKED' },

      actions: {} as { type: 'setChecked'; params: { checked: boolean } },
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
      setChecked: assign(({ action }) => {
        return { checked: action.params?.checked }
      }),
    },
    guards: {
      isDisabled: ({ context }) => context.disabled,
    },
  },
)
