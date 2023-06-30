import { forwardRef, InputHTMLAttributes, useContext } from 'react'
import { RadioGroupContext } from './context'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {} = useContext(RadioGroupContext)!

  return <input type="radio" ref={ref} />
})

Input.displayName = 'RadioGroup.Input'
