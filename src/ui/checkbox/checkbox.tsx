import { useEffect, useMemo, useRef } from 'react'
import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { machine } from '@/machines/checkbox'
import { dataAttr } from '@/utils/attrs'
import { composeRefs } from '@/utils/compose-refs'

export const Checkbox = forwardRefWithAsChild<
  'input',
  { onInputChange?: (checked: boolean) => void }
>((props, ref) => {
  const { onInputChange, ...rest } = props
  const [state, send] = useActor(machine, {
    input: {
      isDisabled: props.disabled,
      isRequired: props.required,
      isDefaultChecked: props.defaultChecked,
      name: props.name,
      value: props.value,
    },
  })

  const isControlled = props.checked !== undefined

  const inputRef = useRef<HTMLInputElement | null>(null)
  const composedRef = useMemo(() => composeRefs(ref, (node) => (inputRef.current = node)), [ref])

  const { context } = state
  const isChecked = state.value === 'checked' ? true : false
  const isFocused = context.isFocused
  const isHovered = context.isHovered
  const isActive = context.isActive
  const isDisabled = context.isDisabled
  const isRequired = context.isRequired
  const isIndeterminate = context.isIndeterminate
  const name = context.name

  /**
   * 컴포넌트 밖에서 관리하는 속성들과 상태머신의 싱크를 맞춰주는 이팩트
   */
  useEffect(() => {
    if (props.checked === undefined) return

    send({ type: 'SET_CHECKED', checked: props.checked })
  }, [send, props.checked])

  useEffect(() => {
    send({ type: 'SET_DISABLED', value: !!props.disabled })
  }, [send, props.disabled])

  useEffect(() => {
    send({ type: 'SET_REQUIRED', value: !!props.required })
  }, [send, props.required])

  /**
   * 체크 상태를 컴포넌트 밖에서 관리할 경우 체크 상태 변경에 따라 인풋 onChange 이벤트를 발생시켜주는 이팩트
   */
  useEffect(() => {
    if (props.checked === undefined) return
    if (!inputRef.current) return

    const input = inputRef.current
    const inputProto = window.HTMLInputElement.prototype
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
    const setChecked = descriptor.set

    if (setChecked) {
      const event = new Event('click', { bubbles: true })
      input.indeterminate = isIndeterminate
      setChecked.call(input, isIndeterminate ? false : props.checked)
      input.dispatchEvent(event)
    }
  }, [isIndeterminate, props.checked])

  return (
    <Dive.input
      {...rest}
      type="checkbox"
      ref={composedRef}
      onFocus={() => send({ type: 'SET_FOCUSED', value: true })}
      onBlur={() => send({ type: 'SET_FOCUSED', value: false })}
      onPointerEnter={() => send({ type: 'SET_HOVERED', value: true })}
      onPointerLeave={() => send({ type: 'SET_HOVERED', value: false })}
      onPointerDown={() => send({ type: 'SET_ACTIVE', value: true })}
      onPointerUp={() => send({ type: 'SET_ACTIVE', value: false })}
      disabled={isDisabled}
      required={isRequired}
      name={name}
      checked={!isControlled ? isChecked : undefined}
      defaultChecked={isControlled ? isChecked : undefined}
      onChange={(ev) => {
        !isControlled && send({ type: 'CHECK' })
        onInputChange?.(ev.target.checked)
      }}
      data-dive-focused={dataAttr(isFocused)}
      data-dive-hovered={dataAttr(isHovered)}
      data-dive-active={dataAttr(isActive)}
      data-dive-disabled={dataAttr(isDisabled)}
      data-dive-state={isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'}
    />
  )
})
