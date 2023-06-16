'use client'

import * as Checkbox from '@/ui/checkbox'
import { useState } from 'react'

export default function CheckboxPage() {
  const [checked, setChecked] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)

  return (
    <main>
      <h1>체크박스</h1>
      <div>
        <button type="button" onClick={() => setChecked(!checked)}>
          checked state: {String(checked)}
        </button>
        <button type="button" onClick={() => setDisabled(!disabled)}>
          disabled state: {String(disabled)}
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log('form onSubmit', e)
        }}
        onChange={(e) => {
          console.log('form onChange', e)
        }}
      >
        <Checkbox.Root
          id={'checkbox-input'}
          checked={checked}
          onCheckedChange={(checked) => setChecked(checked === 'checked' ? true : false)}
          disabled={disabled}
        >
          <Checkbox.Indicator>버튼</Checkbox.Indicator>
          <Checkbox.Input />
        </Checkbox.Root>
      </form>
    </main>
  )
}
