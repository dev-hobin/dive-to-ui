import { useContext } from 'react'
import { RadioGroupContext } from './context'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { mergeProps } from '@/utils/merge-props'

type InputProps = { value: string }
export const Input = forwardRefWithAsChild<'input', InputProps>((props, ref) => {
  const { getInputProps } = useContext(RadioGroupContext)!

  const mergedProps = mergeProps(getInputProps(props.value), props)
  return <Dive.input {...mergedProps} ref={ref} />
})

Input.displayName = 'RadioGroup.Input'
