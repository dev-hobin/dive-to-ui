import { assign, createMachine } from 'xstate'

export type CheckedState = 'unchecked' | 'checked' | 'indeterminate'

export type Context = {
  id: string
  name: string | undefined
  checkedState: CheckedState
  onCheckedChange?: (checkedState: CheckedState) => void
}

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHECK: {
            actions: ['updateCheckedState', 'dispatchChange', 'syncInputState', 'invokeOnChange'],
          },
          'INPUT.CHECK': {
            actions: ['setCheckedState', 'invokeOnChange'],
          },
          'CHECKED.SET': {
            actions: ['setCheckedState', 'dispatchChange', 'syncInputState'],
          },
          'CONTEXT.SET': {
            actions: ['setContext'],
          },
        },
      },
    },
    types: {
      context: {} as Context,
      events: {} as
        | { type: 'CHECK' }
        | { type: 'INPUT.CHECK'; value: CheckedState }
        | { type: 'CHECKED.SET'; value: CheckedState }
        | { type: 'CONTEXT.SET'; context: Partial<Context> },
    },
    context: ({ input }) => ({
      id: input?.id ?? '',
      name: input?.name ?? undefined,
      checkedState: input?.checkedState ?? 'unchecked',
      onCheckedChange: input?.onCheckedChange,
    }),
  },
  {
    actions: {
      updateCheckedState: assign(({ context }) => {
        console.log('updateCheckedState', context)
        const { checkedState } = context
        switch (checkedState) {
          case 'indeterminate':
          case 'unchecked':
            return { checkedState: 'checked' as CheckedState }
          case 'checked':
          default:
            return { checkedState: 'unchecked' as CheckedState }
        }
      }),
      syncInputState: ({ context }) => {
        console.log('syncInputState')
        const { id, checkedState } = context
        const inputEl = document.getElementById(id) as HTMLInputElement | null
        if (!inputEl) return

        inputEl.checked = isChecked(checkedState)
        inputEl.indeterminate = isIndeterminate(checkedState)
      },
      dispatchChange: ({ context }) => {
        console.log('dispatchChange')
        const { id, checkedState } = context
        const inputEl = document.getElementById(id) as HTMLInputElement | null
        if (!inputEl) return

        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'checked',
        ) as PropertyDescriptor
        const indeterminateDescriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'indeterminate',
        ) as PropertyDescriptor
        const setChecked = descriptor.set
        const setIndeterminate = indeterminateDescriptor.set

        if (!setChecked) return
        if (!setIndeterminate) return

        setChecked.call(inputEl, isChecked(checkedState))
        setIndeterminate.call(inputEl, isIndeterminate(checkedState))
        const ev = new Event('click', { bubbles: true })
        inputEl.dispatchEvent(ev)
      },
      setCheckedState: assign(({ context, event }) => {
        console.log('setCheckedState')
        if (event.type !== 'INPUT.CHECK' && event.type !== 'CHECKED.SET') return {}
        if (context.checkedState === event.value) return {}
        return { checkedState: event.value }
      }),
      invokeOnChange: ({ context }) => {
        console.log('invokeOnChange')
        context.onCheckedChange?.(context.checkedState)
      },
      setContext: assign(({ event }) => {
        if (event.type !== 'CONTEXT.SET') return {}
        return event.context
      }),
    },
  },
)

const isChecked = (checkedState: CheckedState) => checkedState === 'checked'
const isIndeterminate = (checkedState: CheckedState) => checkedState === 'indeterminate'
