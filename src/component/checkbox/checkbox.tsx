'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { Checkbox as DiveCheckbox } from '@/ui/checkbox'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <DiveCheckbox asChild>
      <input type="checkbox" {...props} ref={ref} />
    </DiveCheckbox>
  )
})

Checkbox.displayName = 'Checkbox'
