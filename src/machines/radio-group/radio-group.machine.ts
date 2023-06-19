import { createMachine, assign } from 'xstate'

export type Item = {
  value: string
  disabled: boolean
  required: boolean
}

export const machine = createMachine(
  {
    id: 'RadioGroup',
    initial: 'idle',
    states: {
      idle: {},
    },
    on: {
      'ITEM.ADD': {
        actions: 'addItem',
      },
      'ITEM.REMOVE': {
        actions: 'removeItem',
      },
      'FOCUS.NEXT': {},
      'FOCUS.PREVIOUS': {},
      'ITEM.SELECT': {},
      'FOCUS.CURRENT': {},
    },
    schema: {
      context: {} as {
        id: string
        disabled: boolean
        name: string
        required: boolean
        value: string
        defaultValue: string
        currentFocusedItem: string
        itemMap: Record<string, Item>
      },
      events: {} as
        | { type: 'ITEM.ADD'; payload: { item: Item } }
        | { type: 'ITEM.REMOVE'; payload: { value: string } }
        | { type: 'FOCUS.NEXT' }
        | { type: 'FOCUS.PREVIOUS' }
        | { type: 'ITEM.SELECT' }
        | { type: 'FOCUS.CURRENT' },
    },
    context: {
      id: 'radioGroupId',
      disabled: false,
      name: 'radioGroupName',
      required: false,
      value: 'value',
      defaultValue: 'defaultValue',
      currentFocusedItem: 'focusedItemValue',
      itemMap: {},
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      addItem: assign({
        itemMap: (ctx, ev) => {
          if (ev.type === 'ITEM.ADD') {
            const { item } = ev.payload
            const updatedMap = { ...ctx.itemMap }
            updatedMap[item.value] = item
            return updatedMap
          }
          return ctx.itemMap
        },
      }),
      removeItem: assign({
        itemMap: (ctx, ev) => {
          if (ev.type === 'ITEM.REMOVE') {
            const { value } = ev.payload
            const removedMap = { ...ctx.itemMap }
            delete removedMap[value]
            return removedMap
          }
          return ctx.itemMap
        },
      }),
    },
  },
)
