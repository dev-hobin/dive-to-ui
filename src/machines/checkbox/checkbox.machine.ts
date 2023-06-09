import { createMachine } from 'xstate'

export const machine = createMachine({
  id: 'Checkbox',
  initial: 'idle',
  states: {
    idle: {},
  },
  types: {
    context: {} as {
      checked: boolean
      disabled: boolean
      required: boolean
      value: string
      name: string
    },
  },
  context: ({ input }) => ({
    checked: input.checked ?? false,
    disabled: input.disabled ?? false,
    required: input.required ?? false,
    name: input.name ?? '',
    value: input.value ?? 'on',
  }),
})
