import { assign, createMachine } from 'xstate'

export type Context = {
  checked: CheckedState
  id: string
  name: string
  disabled: boolean
  required: boolean
  value: string
}
export type CheckedState = 'unchecked' | 'checked' | 'indeterminate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHECK: [
            {
              guard: 'isDisabled',
            },
            {
              actions: ['setChecked', 'dispatchChange'],
            },
          ],
        },
      },
    },
    on: {
      'CHECKED.SET': [
        {
          guard: ({ context, event }) => context.checked === event.value,
        },
        {
          target: '.idle',
          actions: ['setChecked', 'dispatchChange'],
        },
      ],
      'CONTEXT.SET': {
        target: '.idle',
        actions: 'setContext',
      },
    },
    types: {
      context: {} as Context,
      events: {} as
        | { type: 'CHECK' }
        | { type: 'CHECKED.SET'; value: CheckedState }
        | { type: 'CONTEXT.SET'; value: Partial<Context> },
    },
    context: ({ input }) => ({
      checked: input.checked ?? 'unchecked',
      id: input.id ?? '',
      name: input.name ?? 'inputName',
      disabled: input.disabled ?? false,
      required: input.required ?? false,
      value: input.value ?? 'on',
    }),
  },
  {
    guards: {
      isDisabled: ({ context }) => context.disabled,
    },
    actions: {
      setChecked: assign({
        checked: ({ context, event }) => {
          if (event.type === 'CHECK') {
            if (context.checked === 'checked') return 'unchecked'
            if (context.checked === 'unchecked') return 'checked'
            return 'checked'
          } else if (event.type === 'CHECKED.SET') {
            const checked = event.value
            return checked
          } else {
            return context.checked
          }
        },
      }),
      setContext: assign(({ context, event }) => {
        if (event.type !== 'CONTEXT.SET') return context
        return event.value
      }),

      dispatchChange: ({ context }) => {
        const { id, checked } = context
        console.log('dispatchChange')

        const inputEl = document.getElementById(id) as HTMLInputElement | null
        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'checked',
        ) as PropertyDescriptor
        const setChecked = descriptor.set

        if (inputEl && setChecked) {
          const ev = new Event('click', { bubbles: true })
          inputEl.indeterminate = checked === 'indeterminate' ? true : false
          setChecked.call(inputEl, checked === 'unchecked' ? false : true)
          inputEl.dispatchEvent(ev)
        }
      },
    },
  },
)
