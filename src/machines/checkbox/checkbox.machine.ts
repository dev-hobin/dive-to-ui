import { assign, createMachine, not, raise } from 'xstate'

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
                actions: [{ type: 'dispatchChange', params: { checkedState: 'unchecked' } }],
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
                actions: [{ type: 'dispatchChange', params: { checkedState: 'checked' } }],
              },
            },
          },
          indeterminate: {
            entry: assign({ checkedState: 'indeterminate' }),
            exit: assign({ previousCheckedState: 'indeterminate' }),
          },
        },
        on: {
          SET_CHECKED: {
            target: '.checked',
            actions: [{ type: 'dispatchChange', params: { checkedState: 'checked' } }],
          },
          SET_UNCHECKED: {
            target: '.unchecked',
            actions: [{ type: 'dispatchChange', params: { checkedState: 'unchecked' } }],
          },
          SET_INDETERMINATE: {
            target: '.indeterminate',
            actions: [{ type: 'dispatchChange', params: { checkedState: 'indeterminate' } }],
          },
          'INPUT.CHANGE': [
            {
              target: '.indeterminate',
              guard: ({ event }) => event.payload.indeterminate,
            },
            {
              target: '.checked',
              guard: ({ event }) => event.payload.checked,
            },
            {
              target: '.unchecked',
            },
          ],
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
        id: string
        checkedState: CheckedState
        previousCheckedState?: CheckedState
        name?: string
        disabled: boolean
        required: boolean
      },
      events: {} as
        | { type: 'CHECK' }
        | { type: 'SET_CHECKED' }
        | { type: 'SET_UNCHECKED' }
        | { type: 'SET_INDETERMINATE' }
        | { type: 'SET_DISABLED'; payload: { disabled: boolean } }
        | { type: 'SET_REQUIRED'; payload: { required: boolean } }
        | {
            type: 'INPUT.CHANGE'
            payload: { checked: boolean; indeterminate: boolean }
          },
    },
    context: ({ input }) => ({
      id: input?.id,
      checkedState: input?.checkedState ?? 'unchecked',
      previousCheckedState: undefined,
      name: input?.name,
      disabled: input?.disabled ?? false,
      required: input?.required ?? false,
    }),
  },
  {
    guards: {
      isChecked: ({ context }) => context.checkedState === 'checked',
      isIndeterminate: ({ context }) => context.checkedState === 'indeterminate',
      isDisabled: ({ context }) => context.disabled,
    },
    actions: {
      setDisabled: assign(({ event }) => {
        if (event.type !== 'SET_DISABLED') return {}
        return { disabled: event.payload.disabled }
      }),
      setRequired: assign(({ event }) => {
        if (event.type !== 'SET_REQUIRED') return {}
        return { disabled: event.payload.required }
      }),

      dispatchChange: ({ action, context }) => {
        const input = document.getElementById(context.id) as HTMLInputElement
        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'checked',
        ) as PropertyDescriptor
        const setChecked = descriptor.set

        if (setChecked) {
          const ev = new Event('click', { bubbles: true })
          input.indeterminate = action.params?.checkedState === 'indeterminate' ? true : false
          setChecked.call(input, action.params?.checkedState === 'unchecked' ? false : true)
          input.dispatchEvent(ev)
        }
      },
    },
  },
)
