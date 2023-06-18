import { createMachine } from 'xstate'

type Item = {
  value: string
  disabled: boolean
  required: boolean
}

export const machine = createMachine({
  id: 'RadioGroup',
  initial: 'idle',
  states: {
    idle: {},
  },
  on: {
    'ITEM.ADD': {},
    'ITEM.REMOVE': {},
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
      | { type: 'ITEM.ADD' }
      | { type: 'ITEM.REMOVE' }
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
})
