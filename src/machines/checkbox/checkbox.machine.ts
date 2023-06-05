import { and, assign, createMachine, not } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGEAWYDGBrARgewA8BiAZQFEAVAfQAkB5ANTICUyARAbQAYBdRUAA55YASwAuIvADt+IAogDMAJgCMAOgCcG1QA4AbFx0aArCpUa9AGhABPRABYN6gOx7je5feOrlzgL5+1miYuISklFQAgsgUAJJM3HxIIEKiEtKy8ggKClxqSlwKKqr2XM72SkXO1nbZJmo6xcZcxhYqzlx67QFB6Nj4xOTUAGJ0yACq5Jy8sqnikjLJWcrqjUqOzlpKxgoVNYhKWg2tCpv2zsWbej0gwf1hQ1RssSSRAEIAMuyJs8LzGUtFKo1GU1jolHodM4oS19ggCgpNJ1tocdIYdoYbndQoMIqwAIrjWKsaZJQR-dKLUDLAr5Nx6Sr2NxcFFwlRlTQ7Yp6RxcCpuexYvo48LUWIAOTYlBYAFkJZEKGQfsk5pTMgcNM46e4lM4LltXGylEKQgM1AAnMAAQwgNlFVGQNDIyAA0t8ZiqKQt1Qg9XC2momVCdRVToUTfcCBbrbb7Y7nW7OCoySkvQDqYg-bZM-U0QUnJ0FGiVDoIzjozabGoMMLIER467leS0t7AQhmnlio4tF4FAz7Co4Zs8rpnO5SgoTOcy2bLZW1ABXKQ1kJ1hsupuplvpuSIDtqLtaDS9-uD7MIHSlNQXYMMiyVbo3KR4CBwWTYga-bdU3cIAC05hwsY5TXiWY5GBUxitMagS3MKZoiBAAA2YBfv8P5ZOccJ6Ay+RgcBzi6mYOjGDOhAVraaFqm2hxDiyoHBq45iTlBZFRnOtrVrWEBUa2GYIF0xgNOUWj6JUzTeHCl6IjeY53gyVRsRRVZLiu2CQLxO7LAYDQaMipjiVBxhDhYai5AUMK5JOGgBAEQA */
    id: 'Checkbox',
    initial: 'idle',
    states: {
      idle: {
        always: [
          {
            target: 'ready.checked',
            guard: ({ context }) => context.isDefaultChecked,
          },
          {
            target: 'ready.unchecked',
          },
        ],
      },
      ready: {
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
        },
      },
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
        isDefaultChecked: boolean
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
      isDefaultChecked: input.isDefaultChecked ?? false,
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
