import { assign, createMachine } from 'xstate'

export type CheckedState = 'unchecked' | 'checked' | 'indeterminate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHECK: {
            cond: 'isNotDisabled',
            actions: 'setChecked',
          },
        },
      },
    },
    on: {
      'CHECKED.SET': {
        target: '.idle',
        actions: 'setChecked',
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
      events: {} as { type: 'CHECK' } | { type: 'CHECKED.SET'; value: CheckedState },
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
  },
  {
    guards: {
      isNotDisabled: (ctx) => !ctx.disabled,
    },
    actions: {
      setChecked: assign({
        checked: (ctx, ev) => {
          if (ev.type === 'CHECK') {
            if (ctx.checked === 'checked') return 'unchecked'
            if (ctx.checked === 'unchecked') return 'checked'
            return 'checked'
          } else if (ev.type === 'CHECKED.SET') {
            const checked = ev.value
            return checked
          } else {
            return ctx.checked
          }
        },
      }),
    },
  },
)
