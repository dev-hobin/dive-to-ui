import { createMachine } from 'xstate'

type CheckedState = 'unchecked' | 'checked' | 'indeterminate'

export const machine = createMachine({
  id: 'Checkbox',
  initial: 'idle',
  states: {
    idle: {
      on: {
        CHECK: {},
      },
    },
  },
  schema: {
    context: {} as {
      checked: CheckedState
      id: string
      name: string
      disabled: boolean
      required: boolean
      value: string
    },
    events: {} as { type: 'CHECK' },
  },
  context: {
    checked: 'unchecked',
    id: 'checkboxId',
    name: 'inputName',
    disabled: false,
    required: false,
    value: 'on',
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
})
