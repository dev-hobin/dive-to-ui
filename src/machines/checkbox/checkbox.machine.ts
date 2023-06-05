import { and, assign, createMachine, not } from 'xstate'

export const machine = createMachine(
  {
    id: 'Checkbox',
    initial: 'unchecked',
    states: {
      checked: {
        on: {
          CHECK: {
            target: 'unchecked',
            guard: and([not('isIndeterminate'), not('isDisabled')]),
          },
        },
      },
      unchecked: {
        on: {
          CHECK: {
            target: 'checked',
            guard: and([not('isIndeterminate'), not('isDisabled')]),
          },
        },
      },
    },
    on: {
      SET_CHECKED: [
        {
          guard: ({ event }) => event.checked,
          target: '.checked',
        },
        {
          guard: ({ event }) => !event.checked,
          target: '.unchecked',
        },
      ],
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
      SET_REQUIRED: {
        actions: 'setIsRequired',
      },
      SET_INDETERMINATE: {
        actions: 'setIsIndeterminate',
      },
    },
    types: {
      context: {} as {
        isHovered: boolean
        isFocused: boolean
        isActive: boolean
        isDisabled: boolean
        isRequired: boolean
        isIndeterminate: boolean
        name?: string
        value: string | number | readonly string[]
      },
      events: {} as
        | { type: 'CHECK' }
        | { type: 'SET_CHECKED'; checked: boolean }
        | { type: 'SET_HOVERED'; value: boolean }
        | { type: 'SET_ACTIVE'; value: boolean }
        | { type: 'SET_FOCUSED'; value: boolean }
        | { type: 'SET_DISABLED'; value: boolean }
        | { type: 'SET_REQUIRED'; value: boolean }
        | { type: 'SET_INDETERMINATE'; value: boolean },
    },
    context: ({ input }) => ({
      isHovered: input.isHovered ?? false,
      isFocused: input.isFocused ?? false,
      isActive: input.isActive ?? false,
      isDisabled: input.isDisabled ?? false,
      isRequired: input.isRequired ?? false,
      isIndeterminate: input.isIndeterminate ?? false,
      name: input.name,
      value: input.value ?? 'on',
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
      setIsRequired: assign(({ event }) => {
        if (event.type !== 'SET_REQUIRED') throw `잘못된 이벤트 타입입니다 - ${event.type}`
        return {
          isRequired: event.value,
        }
      }),
      setIsIndeterminate: assign(({ event }) => {
        if (event.type !== 'SET_INDETERMINATE') throw `잘못된 이벤트 타입입니다 - ${event.type}`
        return {
          isIndeterminate: event.value,
        }
      }),
    },
    guards: {
      isDisabled: ({ context }) => context.isDisabled,
      isIndeterminate: ({ context }) => {
        return context.isIndeterminate
      },
    },
  },
)
