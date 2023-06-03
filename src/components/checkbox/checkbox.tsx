'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { Checkbox as DiveCheckbox } from '@/ui/checkbox'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setChecked(!checked)}>상태 : {String(checked)}</button>
      <DiveCheckbox checked={checked} />
    </>
  )
})

Checkbox.displayName = 'Checkbox'
