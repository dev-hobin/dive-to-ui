import { useEffect } from 'react'
import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/core/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { machine } from '@/machine/checkbox'
import { dataAttr } from '@/core/utils/attrs'

export const Checkbox = forwardRefWithAsChild<'input'>((props, ref) => {
  const [state, send] = useActor(machine, {
    input: {
      isDisabled: props.disabled,
      isRequired: props.required,
      name: props.name,
      value: props.value,
    },
  })

  const { context } = state

  const isFocused = context.isFocused
  const isHovered = context.isHovered
  const isActive = context.isActive

  const isDisabled = context.isDisabled
  const isRequired = context.isRequired

  useEffect(() => {
    send({ type: 'SET_DISABLED', value: props.disabled ?? false })
  }, [send, props.disabled])

  useEffect(() => {
    send({ type: 'SET_REQUIRED', value: props.required ?? false })
  }, [send, props.required])

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
      disabled={isDisabled}
      required={isRequired}
      data-dive-focused={dataAttr(isFocused)}
      data-dive-hovered={dataAttr(isHovered)}
      data-dive-active={dataAttr(isActive)}
      data-dive-disabled={dataAttr(isDisabled)}
    />
  )
})
