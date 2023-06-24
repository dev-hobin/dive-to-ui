'use client'

import * as Checkbox from '@/ui/checkbox'

export default function CheckboxPage() {
  return (
    <main>
      <form
        onChange={(ev) => {
          const data = new FormData(ev.currentTarget)
          console.log('form change event: ', data.get('checkbox-name'))
        }}
      >
        <Checkbox.Root id="checkbox-id" name="checkbox-name">
          <Checkbox.Indicator>체크박스</Checkbox.Indicator>
          <label htmlFor="checkbox-id">라벨</label>
          <Checkbox.Input />
        </Checkbox.Root>
      </form>
    </main>
  )
}
