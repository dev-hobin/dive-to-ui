import { createMachine, assign } from 'xstate'

export type RadioItem = {
  value: string
  disabled: boolean
  required: boolean
}

export type Context = {
  id: string
  disabled: boolean
  name: string
  required: boolean
  value: string
  prevValue: string
  defaultValue: string
  focusedValue: string
  itemMap: Record<string, RadioItem>
}

export const machine = createMachine(
  {
    id: 'RadioGroup',
    initial: 'idle',
    states: {
      idle: {
        entry: 'syncInput',
      },
    },
    on: {
      'ITEM.REGISTER': {
        actions: 'registerItem',
      },
      'ITEM.UNREGISTER': {
        actions: 'unregisterItem',
      },
      'ITEM.FOCUS': {
        actions: 'updateFocusedValue',
      },
      'ITEM.BLUR': {
        actions: 'blurItem',
      },
      'ITEM.SELECT': [
        {
          guard: 'isAlreadySelected',
        },
        {
          actions: ['selectItem', 'syncInput', 'dispatchChange'],
        },
      ],
      'ITEM.SELECT.INPUT': {
        actions: ['syncInputToContext'],
      },
      'GOTO.NEXT': {
        actions: ['focusNext', 'selectCurrentFocusedItem', 'syncInput', 'dispatchChange'],
      },
      'GOTO.PREV': {
        actions: ['focusPrev', 'selectCurrentFocusedItem', 'syncInput', 'dispatchChange'],
      },
      'CONTEXT.SET': {
        actions: 'setContext',
      },
    },
    types: {
      context: {} as Context,
      events: {} as
        | { type: 'ITEM.REGISTER'; payload: { item: RadioItem } }
        | { type: 'ITEM.UNREGISTER'; payload: { value: string } }
        | { type: 'ITEM.SELECT'; payload: { value: string } }
        | { type: 'ITEM.SELECT.INPUT'; payload: { value: string } }
        | { type: 'ITEM.FOCUS'; payload: { value: string } }
        | { type: 'ITEM.BLUR' }
        | { type: 'GOTO.NEXT' }
        | { type: 'GOTO.PREV' }
        | { type: 'CONTEXT.SET'; payload: { context: Partial<Context> } },
    },
    context: {
      id: '',
      disabled: false,
      name: '',
      required: false,
      value: '',
      prevValue: '',
      defaultValue: '',
      focusedValue: '',
      itemMap: {},
    },
  },
  {
    guards: {
      isAlreadySelected: ({ context, event }) => {
        if (event.type !== 'ITEM.SELECT') return false
        const { value } = event.payload
        return value === context.value
      },
    },
    actions: {
      registerItem: assign({
        itemMap: ({ context, event }) => {
          if (event.type === 'ITEM.REGISTER') {
            const { item } = event.payload
            const addedMap = { ...context.itemMap }
            addedMap[item.value] = item
            return addedMap
          }
          return context.itemMap
        },
      }),
      unregisterItem: assign({
        itemMap: ({ context, event }) => {
          if (event.type === 'ITEM.UNREGISTER') {
            const { value } = event.payload
            const removedMap = { ...context.itemMap }
            delete removedMap[value]
            return removedMap
          }
          return context.itemMap
        },
      }),
      selectItem: assign(({ context, event }) => {
        if (event.type !== 'ITEM.SELECT') return {}
        console.log('selectItem')
        const { value } = event.payload
        return {
          prevValue: context.value,
          value: value,
        }
      }),
      selectCurrentFocusedItem: assign(({ context }) => {
        const currentFocusedEl = document.activeElement
        const nextValue = currentFocusedEl?.getAttribute('value') ?? ''

        return {
          value: nextValue,
          prevValue: context.value,
        }
      }),
      blurItem: assign({ focusedValue: '' }),
      setContext: assign(({ context, event }) => {
        if (event.type === 'CONTEXT.SET') return event.payload.context
        return context
      }),
      updateFocusedValue: assign({
        focusedValue: ({ context, event }) => {
          if (event.type !== 'ITEM.FOCUS') return context.focusedValue
          const { value } = event.payload
          return value
        },
      }),
      focusNext: ({ context }) => {
        console.log('focusNext')
        const group = document.getElementById(context.id)
        const items = Array.from(
          group?.querySelectorAll('[role=radio]:not(:disabled)') ?? [],
        ) as HTMLElement[]
        console.log('items', items)
        if (items.length === 0) return

        const currIndex = items.findIndex((el) => el.getAttribute('value') === context.focusedValue)
        console.log(items[0].getAttribute('value'), context.focusedValue)
        if (currIndex === -1) return

        const isLastItem = items.length - 1 === currIndex

        if (isLastItem) {
          items[0].focus()
        } else {
          items[currIndex + 1].focus()
        }
      },
      focusPrev: ({ context }) => {
        const group = document.getElementById(context.id)
        const items = Array.from(
          group?.querySelectorAll('[role=radio]:not(:disabled)') ?? [],
        ) as HTMLElement[]
        if (items.length === 0) return
        const currIndex = items.findIndex((el) => el.getAttribute('value') === context.focusedValue)
        if (currIndex === -1) return
        const isFirstItem = currIndex === 0

        if (isFirstItem) {
          items[items.length - 1].focus()
        } else {
          items[currIndex - 1].focus()
        }
      },
      syncInput: ({ context }) => {
        console.log('syncInput')
        const { prevValue, value } = context
        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'checked',
        ) as PropertyDescriptor
        const setChecked = descriptor.set

        const prevInputEl = document.getElementById(prevValue) as HTMLInputElement | null
        const inputEl = document.getElementById(value) as HTMLInputElement | null

        if (!setChecked) return
        if (prevInputEl) setChecked.call(prevInputEl, false)
        if (inputEl) setChecked.call(inputEl, true)
      },
      dispatchChange: ({ context }) => {
        console.log('dispatchChange')
        const { value } = context

        const inputEl = document.getElementById(value) as HTMLInputElement | null
        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'checked',
        ) as PropertyDescriptor
        const setChecked = descriptor.set

        if (inputEl && setChecked) {
          const ev = new Event('click', { bubbles: true })
          setChecked.call(inputEl, inputEl.checked)
          inputEl.dispatchEvent(ev)
        }
      },
      syncInputToContext: assign(({ context, event }) => {
        console.log('syncInputContext')
        if (event.type !== 'ITEM.SELECT.INPUT') return {}
        const { value } = event.payload
        return {
          prevValue: context.value,
          value: value,
        }
      }),
    },
  },
)
