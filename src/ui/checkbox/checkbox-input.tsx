import { forwardRef, InputHTMLAttributes, useContext } from 'react'
import { CheckboxContext } from './context'
import { mergeProps } from '@/utils/merge-props'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { inputProps } = useContext(CheckboxContext)!
  const mergedProps = mergeProps(inputProps, props)

  return <input type="checkbox" {...mergedProps} ref={ref} />
})

Input.displayName = 'Checkbox.Input'
