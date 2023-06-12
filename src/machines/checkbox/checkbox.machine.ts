import { assign, createMachine } from 'xstate'

export type CheckedState = 'checked' | 'unchecked' | 'indeterminate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'init',
    states: {
      init: {
        always: [
          {
            target: 'disabled',
            guard: 'isDisabled',
          },
          {
            target: 'checkedState',
          },
          {
            target: '#Checkbox.checkedState.checked',
            guard: 'isChecked',
          },
          {
            target: '#Checkbox.checkedState.indeterminate',
            guard: 'isIndeterminate',
          },
        ],
      },
      checkedState: {
        initial: 'unchecked',
        states: {
          checked: {
            entry: assign({ checkedState: 'checked' }),
            exit: assign({ previousCheckedState: 'checked' }),
            on: {
              CHECK: {
                target: 'unchecked',
              },
            },
          },
          unchecked: {
            entry: assign({ checkedState: 'unchecked' }),
            exit: assign({ previousCheckedState: 'unchecked' }),
            on: {
              CHECK: {
                target: 'checked',
              },
            },
          },
          indeterminate: {
            entry: assign({ checkedState: 'indeterminate' }),
            exit: assign({ previousCheckedState: 'indeterminate' }),
            on: {
              SET_PREVIOUS_STATE: [
                {
                  target: 'checked',
                  guard: 'isPreviousChecked',
                },
                {
                  target: 'unchecked',
                  guard: 'isPreviousUnchecked',
                },
                {
                  target: 'indeterminate',
                  reenter: true,
                },
              ],
            },
          },
        },
        on: {
          SET_CHECKED: {
            target: '.checked',
          },
          SET_UNCHECKED: {
            target: '.unchecked',
          },
          SET_INDETERMINATE: {
            target: '.indeterminate',
          },
        },
      },
      disabled: {
        entry: assign({ disabled: true }),
        exit: assign({ disabled: false }),
        on: {
          SET_ENABLED: {
            target: 'init',
          },
        },
      },
    },
    on: {
      SET_DISABLED: {
        target: '.disabled',
      },
    },
    types: {
      context: {} as {
        checkedState: CheckedState | null
        previousCheckedState: CheckedState | null
        disabled: boolean
      },
      events: {} as
        | { type: 'CHECK' }
        | { type: 'SET_CHECKED' }
        | { type: 'SET_UNCHECKED' }
        | { type: 'SET_INDETERMINATE' }
        | { type: 'SET_DISABLED' }
        | { type: 'SET_PREVIOUS_STATE' }
        | { type: 'SET_ENABLED' },
    },
    context: ({ input }) => ({
      checkedState: input?.checkedState ?? null,
      previousCheckedState: null,
      disabled: input?.disabled ?? false,
    }),
  },
  {
    guards: {
      isChecked: ({ context }) => context.checkedState === 'checked',
      isPreviousChecked: ({ context }) => context.previousCheckedState === 'checked',
      isPreviousUnchecked: ({ context }) => context.previousCheckedState === 'unchecked',
      isIndeterminate: ({ context }) => context.checkedState === 'indeterminate',
      isDisabled: ({ context }) => context.disabled,
    },
  },
)
