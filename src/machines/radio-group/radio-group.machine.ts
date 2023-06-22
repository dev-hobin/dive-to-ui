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
  defaultValue: string
  focusedValue: string
  itemMap: Record<string, RadioItem>
}

export const machine = createMachine(
  {
    id: 'RadioGroup',
    initial: 'idle',
    states: {
      idle: {},
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
      'ITEM.SELECT': {
        actions: 'selectItem',
      },
      'GOTO.NEXT': {
        actions: ['focusNext', 'selectCurrentFocusedItem'],
      },
      'GOTO.PREV': {
        actions: ['focusPrev', 'selectCurrentFocusedItem'],
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
      defaultValue: '',
      focusedValue: '',
      itemMap: {},
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
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
      selectItem: assign({
        value: (ctx, ev) => {
          if (ev.type !== 'ITEM.SELECT') return ctx.value
          const { value } = ev.payload
          return value
        },
      }),
      selectCurrentFocusedItem: assign({
        value: () => {
          const currentFocusedEl = document.activeElement
          const nextValue = currentFocusedEl?.getAttribute('value') ?? ''
          return nextValue
        },
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
        const group = document.getElementById(ctx.id)
        const items = Array.from(
          group?.querySelectorAll('[role=radio]:not(:disabled)') ?? [],
        ) as HTMLElement[]
        if (items.length === 0) return

        const currIndex = items.findIndex((el) => el.getAttribute('value') === ctx.focusedValue)
        console.log(items[0].getAttribute('value'), ctx.focusedValue)
        if (currIndex === -1) return

        const isLastItem = items.length - 1 === currIndex

        console.log(isLastItem)
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
    },
  },
)
