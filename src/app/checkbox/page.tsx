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
      <form
        onSubmit={(ev) => {
          ev.preventDefault()
          console.log(ev)
        }}
        onChange={(ev) => {
          const formData = new FormData(ev.currentTarget)
          console.log(formData.get('hi'))
        }}
      >
        <Checkbox.Root
          id="checkbox"
          checked={checked}
          name="hi"
          onCheckedChange={setChecked}
          disabled={disabled}
        >
          <Checkbox.Indicator>체크박스</Checkbox.Indicator>
          <Checkbox.Input />
        </Checkbox.Root>
      </form>
    </main>
  )
}
