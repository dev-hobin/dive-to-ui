'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import * as UI from '@/ui/checkbox'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <UI.Root>
      <UI.Input ref={ref} />
    </UI.Root>
  )
})

Checkbox.displayName = 'Checkbox'
