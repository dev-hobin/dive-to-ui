'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import * as DiveCheckbox from '@/ui/checkbox'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <DiveCheckbox.Root>
      <DiveCheckbox.Indicator></DiveCheckbox.Indicator>
      <DiveCheckbox.Label>체크박스 라벨</DiveCheckbox.Label>
      <DiveCheckbox.Input {...props} ref={ref} />
    </DiveCheckbox.Root>
  )
})

Checkbox.displayName = 'Checkbox'
