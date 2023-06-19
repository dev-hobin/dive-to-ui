'use client'

import * as RadioGroup from '@/ui/radio-group'
import { useState } from 'react'

export default function RadioGroupPage() {
  const [disabled, setDisabled] = useState<boolean>(true)

  return (
    <main>
      <button type="button" onClick={() => setDisabled(!disabled)}>
        {String(disabled)}
      </button>
      <RadioGroup.Root id="radio-group">
        <RadioGroup.Item value="radio-value-1">radio-1</RadioGroup.Item>
        <RadioGroup.Item value="radio-value-2" disabled={disabled}>
          radio-2
        </RadioGroup.Item>
        <RadioGroup.Item value="radio-value-3">radio-3</RadioGroup.Item>
      </RadioGroup.Root>
    </main>
  )
}
