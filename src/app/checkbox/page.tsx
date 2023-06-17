'use client'

import { useState } from 'react'
import * as Checkbox from '../../ui/checkbox'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'

export default function CheckboxPage() {
  const [checked, setChecked] = useState<CheckedState>('checked')
  const [disabled, setDisabled] = useState<boolean>(false)

  return (
    <main>
      <button
        type="button"
        onClick={() => setChecked((prev) => (prev === 'checked' ? 'unchecked' : 'checked'))}
      >
        체크상태 : {String(checked)}
      </button>
      <button type="button" onClick={() => setDisabled(!disabled)}>
        disabled : {String(disabled)}
      </button>
      <Checkbox.Root
        id="checkbox"
        checked={checked}
        onCheckedChange={setChecked}
        disabled={disabled}
      >
        <Checkbox.Indicator>체크박스</Checkbox.Indicator>
      </Checkbox.Root>
    </main>
  )
}
