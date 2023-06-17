'use client'

import * as Checkbox from '../../ui/checkbox'

export default function CheckboxPage() {
  return (
    <main>
      <Checkbox.Root id="checkbox">
        <Checkbox.Indicator />
      </Checkbox.Root>
    </main>
  )
}
