import { assign, createMachine, not } from 'xstate'

export type CheckedState = 'checked' | 'unchecked' | 'indeterminate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'init',
    states: {
      init: {
        always: [
          {
            target: '#Checkbox.checkedState.checked',
            guard: 'isChecked',
          },
          {
            target: '#Checkbox.checkedState.indeterminate',
            guard: 'isIndeterminate',
          },
          {
            target: 'checkedState',
          },
        ],
      },
      checkedState: {
        initial: 'unchecked',
        states: {
          checked: {
            entry: assign({ checkedState: 'checked' }),
            exit: assign({ previousCheckedState: 'checked' }),
            // @ts-ignore
            on: {
              CHECK: {
                target: 'unchecked',
                guard: not('isDisabled'),
                actions: [{ type: 'onChange', params: { checkedState: 'unchecked' } }],
              },
            },
          },
          unchecked: {
            entry: assign({ checkedState: 'unchecked' }),
            exit: assign({ previousCheckedState: 'unchecked' }),
            // @ts-ignore
            on: {
              CHECK: {
                target: 'checked',
                guard: not('isDisabled'),
                actions: [{ type: 'onChange', params: { checkedState: 'checked' } }],
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
            actions: [{ type: 'onChange', params: { checkedState: 'checked' } }],
          },
          SET_UNCHECKED: {
            target: '.unchecked',
            actions: [{ type: 'onChange', params: { checkedState: 'unchecked' } }],
          },
          SET_INDETERMINATE: {
            target: '.indeterminate',
            actions: [{ type: 'onChange', params: { checkedState: 'indeterminate' } }],
          },
        },
      },
    },
    on: {
      SET_DISABLED: {
        actions: 'setDisabled',
      },
      SET_REQUIRED: {
        actions: 'setRequired',
      },
    },
    types: {
      context: {} as {
        checkedState?: CheckedState
        previousCheckedState?: CheckedState
        name?: string
        disabled: boolean
        required: boolean

        onChange: (checked: CheckedState) => void | null
      },
      events: {} as
        | { type: 'CHECK' }
        | { type: 'SET_CHECKED' }
        | { type: 'SET_UNCHECKED' }
        | { type: 'SET_INDETERMINATE' }
        | { type: 'SET_DISABLED'; payload: { disabled: boolean } }
        | { type: 'SET_REQUIRED'; payload: { required: boolean } }
        | { type: 'SET_PREVIOUS_STATE' },
    },
    context: ({ input }) => ({
      checkedState: input?.checkedState,
      previousCheckedState: undefined,
      name: input?.name,
      disabled: input?.disabled ?? false,
      required: input?.required ?? false,

      onChange: input?.onChange ?? (() => {}),
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
    actions: {
      onChange: ({ action, context }) => context.onChange(action.params?.checkedState),
      setDisabled: assign(({ event }) => {
        if (event.type !== 'SET_DISABLED') return {}
        return { disabled: event.payload.disabled }
      }),
      setRequired: assign(({ event }) => {
        if (event.type !== 'SET_REQUIRED') return {}
        return { disabled: event.payload.required }
      }),
    },
  },
)
