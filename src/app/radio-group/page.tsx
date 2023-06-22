'use client'

import * as RadioGroup from '@/ui/radio-group'
import { useState } from 'react'

export default function RadioGroupPage() {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [value, setValue] = useState<'radio-value-1' | 'radio-value-2' | 'radio-value-3' | ''>(
    'radio-value-1',
  )

  return (
    <main>
      <div>
        <button onClick={() => setValue('radio-value-1')}>radio-1</button>
        <button onClick={() => setValue('radio-value-2')}>radio-2</button>
        <button onClick={() => setValue('radio-value-3')}>radio-3</button>
      </div>
      <form onChange={(ev) => console.log('onChange', ev)}>
        <RadioGroup.Root
          id="radio-group"
          name="radio-group"
          value={value}
          onValueChange={(v) => setValue(v as any)}
        >
          <RadioGroup.Item value="radio-value-1" disabled={disabled}>
            radio-1
          </RadioGroup.Item>
          <label htmlFor="radio-value-3">라벨3</label>
          <RadioGroup.Item value="radio-value-2">radio-2</RadioGroup.Item>
          <RadioGroup.Item value="radio-value-3">radio-3</RadioGroup.Item>

          <RadioGroup.Input value="radio-value-1" />
          <RadioGroup.Input value="radio-value-2" />
          <RadioGroup.Input value="radio-value-3" />
        </RadioGroup.Root>
      </form>
    </main>
  )
}
