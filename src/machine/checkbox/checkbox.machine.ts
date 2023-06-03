import { assign, createMachine, not } from 'xstate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'idle',
    states: {
      idle: {},
    },
    on: {
      SET_HOVERED: {
        actions: 'setIsHovered',
      },
      SET_ACTIVE: {
        guard: not(({ context }) => context.isDisabled),
        actions: 'setIsActive',
      },
      SET_FOCUSED: {
        actions: 'setIsFocused',
      },
      SET_DISABLED: {
        actions: 'setIsDisabled',
      },
    },
    types: {
      context: {} as {
        isHovered: boolean
        isFocused: boolean
        isActive: boolean
        isDisabled: boolean
      },
      events: {} as
        | { type: 'SET_HOVERED'; value: boolean }
        | { type: 'SET_ACTIVE'; value: boolean }
        | { type: 'SET_FOCUSED'; value: boolean }
        | { type: 'SET_DISABLED'; value: boolean },
    },
    context: ({ input }) => ({
      isHovered: input.isHovered ?? false,
      isFocused: input.isFocused ?? false,
      isActive: input.isActive ?? false,
      isDisabled: input.isDisabled ?? false,
    }),
  },
  {
    actions: {
      setIsHovered: assign(({ event }) => {
        if (event.type !== 'SET_HOVERED') throw `잘못된 이벤트 타입입니다 - ${event.type}`
        return {
          isHovered: event.value,
        }
      }),
      setIsFocused: assign(({ event }) => {
        if (event.type !== 'SET_FOCUSED') throw `잘못된 이벤트 타입입니다 - ${event.type}`
        return {
          isFocused: event.value,
        }
      }),
      setIsActive: assign(({ event }) => {
        if (event.type !== 'SET_ACTIVE') throw `잘못된 이벤트 타입입니다 - ${event.type}`
        return {
          isActive: event.value,
        }
      }),
      setIsDisabled: assign(({ event }) => {
        if (event.type !== 'SET_DISABLED') throw `잘못된 이벤트 타입입니다 - ${event.type}`
        return {
          isDisabled: event.value,
        }
      }),
    },
  },
)
