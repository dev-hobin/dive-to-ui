import { assign, createMachine } from 'xstate'

export type CheckedState = 'unchecked' | 'checked' | 'indeterminate'

type Events = { type: 'CHECK' } | { type: 'INPUT.CHECK'; value: CheckedState }
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
              actions: ['updateCheckedState', 'syncInputState', 'dispatchChange'],
            },
            {
              actions: ['updateCheckedState', 'syncInputState'],
            },
          ],
          'INPUT.CHECK': {
            actions: ['setCheckedState'],
          },
        },
      },
    },
    types: {
      context: {} as {
        id: string
        name: string | undefined
        checkedState: CheckedState
      },
      events: {} as { type: 'CHECK' } | { type: 'INPUT.CHECK'; value: CheckedState },
    },
    context: ({ input }) => ({
      id: input?.id ?? '',
      name: input?.name ?? undefined,
      checkedState: input?.checkedState ?? 'unchecked',
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
        if (event.type !== 'INPUT.CHECK') return {}
        if (context.checkedState === event.value) return {}
        return { checkedState: event.value }
      }),
    },
  },
)

const isChecked = (checkedState: CheckedState) => checkedState === 'checked'
const isIndeterminate = (checkedState: CheckedState) => checkedState === 'indeterminate'
