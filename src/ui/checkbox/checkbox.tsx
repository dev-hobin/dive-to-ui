import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/core/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { machine } from '@/machine/checkbox'

export const Checkbox = forwardRefWithAsChild<'input'>((props, ref) => {
  const [state, send] = useActor(machine.provide({}), {
    input: {
      isDisabled: props.disabled,
    },
  })

  const { context } = state
  const isFocused = context.isFocused
  const isHovered = context.isHovered
  const isActive = context.isActive
  const isDisabled = context.isDisabled

  return (
    <Dive.input
      {...props}
      ref={ref}
      onFocus={() => send({ type: 'SET_FOCUSED', value: true })}
      onBlur={() => send({ type: 'SET_FOCUSED', value: false })}
      onPointerEnter={() => send({ type: 'SET_HOVERED', value: true })}
      onPointerLeave={() => send({ type: 'SET_HOVERED', value: false })}
      onPointerDown={() => send({ type: 'SET_ACTIVE', value: true })}
      onPointerUp={() => send({ type: 'SET_ACTIVE', value: false })}
      disabled={isDisabled || undefined}
      data-dive-focused={isFocused ? '' : undefined}
      data-dive-hovered={isHovered ? '' : undefined}
      data-dive-active={isActive ? '' : undefined}
      data-dive-disabled={isDisabled ? '' : undefined}
    />
  )
})
