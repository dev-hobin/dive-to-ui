'use client'

import { useState } from 'react'
import * as Checkbox from '@/ui/checkbox'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'

export default function CheckboxPage() {
  const [checked, setChecked] = useState<CheckedState>('unchecked')

  return (
    <main>
      <div>
        <button
          type="button"
          onClick={() => setChecked((prev) => (prev === 'checked' ? 'unchecked' : 'checked'))}
        >
          체크 {String(checked)}
        </button>
      </div>
      <form
        onChange={(ev) => {
          const data = new FormData(ev.currentTarget)
          console.log('form change event: ', data.get('checkbox-name'))
        }}
      >
        <Checkbox.Root
          id="checkbox-id"
          name="checkbox-name"
          checked={checked}
          onChange={setChecked}
        >
          <Checkbox.Indicator>체크박스</Checkbox.Indicator>
          <label htmlFor="checkbox-id">라벨</label>
          <Checkbox.Input />
        </Checkbox.Root>
      </form>
    </main>
  )
}
