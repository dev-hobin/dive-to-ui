import { createMachine, assign } from 'xstate'

export type RadioItem = {
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
      'ITEM.UPDATE': {
        actions: 'updateItem',
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
        itemMap: Record<string, RadioItem>
      },
      events: {} as
        | { type: 'ITEM.ADD'; payload: { item: RadioItem } }
        | { type: 'ITEM.REMOVE'; payload: { value: string } }
        | {
            type: 'ITEM.UPDATE'
            payload: { value: string; update: Partial<Omit<RadioItem, 'value'>> }
          }
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
            const addedMap = { ...ctx.itemMap }
            addedMap[item.value] = item
            return addedMap
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
      updateItem: assign({
        itemMap: (ctx, ev) => {
          if (ev.type === 'ITEM.UPDATE') {
            const { value, update } = ev.payload
            if (!ctx.itemMap[value]) return ctx.itemMap
            if (Object.values(update).length === 0) return ctx.itemMap

            const updatedMap = { ...ctx.itemMap, [value]: { ...ctx.itemMap[value], ...update } }
            return updatedMap
          }
          return ctx.itemMap
        },
      }),
    },
  },
)
