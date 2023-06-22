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
          cond: 'isAlreadySelected',
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
    schema: {
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
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    guards: {
      isAlreadySelected: (ctx, ev) => {
        if (ev.type !== 'ITEM.SELECT') return false
        const { value } = ev.payload
        return value === ctx.value
      },
    },
    actions: {
      registerItem: assign({
        itemMap: (ctx, ev) => {
          if (ev.type === 'ITEM.REGISTER') {
            const { item } = ev.payload
            const addedMap = { ...ctx.itemMap }
            addedMap[item.value] = item
            return addedMap
          }
          return ctx.itemMap
        },
      }),
      unregisterItem: assign({
        itemMap: (ctx, ev) => {
          if (ev.type === 'ITEM.UNREGISTER') {
            const { value } = ev.payload
            const removedMap = { ...ctx.itemMap }
            delete removedMap[value]
            return removedMap
          }
          return ctx.itemMap
        },
      }),
      selectItem: assign((ctx, ev) => {
        if (ev.type !== 'ITEM.SELECT') return {}
        console.log('selectItem')
        const { value } = ev.payload
        return {
          prevValue: ctx.value,
          value: value,
        }
      }),
      selectCurrentFocusedItem: assign((ctx) => {
        const currentFocusedEl = document.activeElement
        const nextValue = currentFocusedEl?.getAttribute('value') ?? ''

        return {
          value: nextValue,
          prevValue: ctx.value,
        }
      }),
      blurItem: assign({ focusedValue: '' }),
      setContext: assign((ctx, ev) => {
        if (ev.type === 'CONTEXT.SET') return ev.payload.context
        return ctx
      }),
      updateFocusedValue: assign({
        focusedValue: (ctx, ev) => {
          if (ev.type !== 'ITEM.FOCUS') return ctx.focusedValue
          const { value } = ev.payload
          return value
        },
      }),
      focusNext: (ctx) => {
        console.log('focusNext')
        const group = document.getElementById(ctx.id)
        const items = Array.from(
          group?.querySelectorAll('[role=radio]:not(:disabled)') ?? [],
        ) as HTMLElement[]
        console.log('items', items)
        if (items.length === 0) return

        const currIndex = items.findIndex((el) => el.getAttribute('value') === ctx.focusedValue)
        console.log(items[0].getAttribute('value'), ctx.focusedValue)
        if (currIndex === -1) return

        const isLastItem = items.length - 1 === currIndex

        if (isLastItem) {
          items[0].focus()
        } else {
          items[currIndex + 1].focus()
        }
      },
      focusPrev: (ctx) => {
        const group = document.getElementById(ctx.id)
        const items = Array.from(
          group?.querySelectorAll('[role=radio]:not(:disabled)') ?? [],
        ) as HTMLElement[]
        if (items.length === 0) return
        const currIndex = items.findIndex((el) => el.getAttribute('value') === ctx.focusedValue)
        if (currIndex === -1) return
        const isFirstItem = currIndex === 0

        if (isFirstItem) {
          items[items.length - 1].focus()
        } else {
          items[currIndex - 1].focus()
        }
      },
      syncInput: (ctx) => {
        console.log('syncInput')
        const { prevValue, value } = ctx
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
      dispatchChange: (ctx) => {
        console.log('dispatchChange')
        const { value } = ctx

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
      syncInputToContext: assign((ctx, ev) => {
        console.log('syncInputContext')
        if (ev.type !== 'ITEM.SELECT.INPUT') return {}
        const { value } = ev.payload
        return {
          prevValue: ctx.value,
          value: value,
        }
      }),
    },
  },
)
