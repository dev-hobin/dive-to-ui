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
      'ITEM.SELECT': {
        actions: 'selectItem',
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
        | { type: 'CONTEXT.SET'; payload: { context: Partial<Context> } }
        | { type: 'ITEM.SELECT'; payload: { value: string } },
    },
    context: {
      id: '',
      disabled: false,
      name: '',
      required: false,
      value: '',
      defaultValue: '',
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
      setContext: assign((ctx, ev) => {
        if (ev.type === 'CONTEXT.SET') return ev.payload.context
        return ctx
      }),
    },
  },
)
