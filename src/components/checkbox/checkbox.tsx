'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import * as UI from '@/ui/checkbox'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <UI.Root>
      <UI.Indicator>버튼</UI.Indicator>
      <UI.Input ref={ref} />
    </UI.Root>
  )
})

Checkbox.displayName = 'Checkbox'
