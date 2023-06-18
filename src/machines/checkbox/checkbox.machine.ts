import { assign, createMachine } from 'xstate'

export type Context = {
  checked: CheckedState
  id: string
  name: string
  disabled: boolean
  required: boolean
  value: string
  controlled: boolean
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
            { cond: 'isDisabled' },
            {
              cond: 'isControlled',
              actions: 'setChecked',
            },
            { actions: ['setChecked', 'dispatchChange'] },
          ],
        },
      },
    },
    on: {
      'CHECKED.SET': {
        target: '.idle',
        actions: ['setChecked', 'dispatchChange'],
      },
      'CONTEXT.SET': {
        target: '.idle',
        actions: 'setContext',
      },
    },
    schema: {
      context: {} as Context,
      events: {} as
        | { type: 'CHECK' }
        | { type: 'CHECKED.SET'; value: CheckedState }
        | { type: 'CONTEXT.SET'; value: Partial<Context> },
    },
    context: {
      checked: 'unchecked',
      id: 'checkboxId',
      name: 'inputName',
      disabled: false,
      required: false,
      value: 'on',
      controlled: false,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    guards: {
      isDisabled: (ctx) => ctx.disabled,
      isControlled: (ctx) => ctx.controlled,
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
      setContext: assign((ctx, ev) => {
        if (ev.type === 'CONTEXT.SET') return ev.value
        return ctx
      }),

      dispatchChange: (ctx) => {
        const { id, checked } = ctx
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
