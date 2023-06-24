import { assign, createMachine } from 'xstate'

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
              guard: 'withForm',
              actions: ['updateCheckedState', 'invokeOnChange', 'syncInputState', 'dispatchChange'],
            },
            {
              actions: ['updateCheckedState', 'invokeOnChange', 'syncInputState'],
            },
          ],
          'INPUT.CHECK': {
            actions: ['setCheckedState', 'invokeOnChange'],
          },
          'CHECKED.SET': [
            {
              guard: 'withForm',
              actions: ['setCheckedState', 'syncInputState', 'dispatchChange'],
            },
            {
              actions: ['setCheckedState', 'syncInputState'],
            },
          ],
        },
      },
    },
    types: {
      context: {} as {
        id: string
        name: string | undefined
        checkedState: CheckedState
        onCheckedChange?: (checkedState: CheckedState) => void
      },
      events: {} as
        | { type: 'CHECK' }
        | { type: 'INPUT.CHECK'; value: CheckedState }
        | { type: 'CHECKED.SET'; value: CheckedState },
    },
    context: ({ input }) => ({
      id: input?.id ?? '',
      name: input?.name ?? undefined,
      checkedState: input?.checkedState ?? 'unchecked',
      onCheckedChange: input?.onCheckedChange,
    }),
  },
  {
    guards: {
      withForm: ({ context }) => !!context.name,
    },
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

        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'checked',
        ) as PropertyDescriptor
        const setChecked = descriptor.set

        if (!setChecked) return
        setChecked.call(inputEl, isChecked(checkedState))
        inputEl.indeterminate = isIndeterminate(checkedState)
      },
      dispatchChange: ({ context }) => {
        console.log('dispatchChange')
        const { id } = context
        const inputEl = document.getElementById(id) as HTMLInputElement | null
        if (!inputEl) return

        const ev = new Event('click', { bubbles: true })
        inputEl.dispatchEvent(ev)
      },
      setCheckedState: assign(({ context, event }) => {
        if (event.type !== 'INPUT.CHECK' && event.type !== 'CHECKED.SET') return {}
        if (context.checkedState === event.value) return {}
        return { checkedState: event.value }
      }),
      invokeOnChange: ({ context }) => {
        console.log('invokeOnChange')
        context.onCheckedChange?.(context.checkedState)
      },
    },
  },
)

const isChecked = (checkedState: CheckedState) => checkedState === 'checked'
const isIndeterminate = (checkedState: CheckedState) => checkedState === 'indeterminate'
