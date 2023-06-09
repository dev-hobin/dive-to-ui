'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { Checkbox as DiveCheckbox } from '@/ui/checkbox'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return <DiveCheckbox ref={ref} {...props} />
})

Checkbox.displayName = 'Checkbox'
