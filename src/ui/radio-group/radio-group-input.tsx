import { forwardRef, InputHTMLAttributes, useContext } from 'react'
import { RadioGroupContext } from './context'
import { mergeProps } from '@/utils/merge-props'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { inputProps } = useContext(RadioGroupContext)!

  const mergedProps = mergeProps(inputProps, props)
  return <input type="radio" {...mergedProps} ref={ref} />
})

Input.displayName = 'RadioGroup.Input'
