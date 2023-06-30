import { useState } from 'react'
import type { Meta } from '@storybook/react'

import * as Checkbox from '.'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'

type CheckboxType = typeof Checkbox.Root

const meta: Meta<CheckboxType> = {
  title: 'Component/Checkbox',
  component: Checkbox.Root,
}

export default meta

export const Uncontrolled = () => {
  return (
    <Checkbox.Root id="uncontrolled" defaultChecked>
      <Checkbox.Indicator>indicator</Checkbox.Indicator>
      <Checkbox.Input />
    </Checkbox.Root>
  )
}

export const Controlled = () => {
  const [checked, setChecked] = useState<CheckedState>('unchecked')

  return (
    <Checkbox.Root id="controlled" checked={checked} name="hi" onChange={setChecked}>
      <Checkbox.Indicator>indicator</Checkbox.Indicator>
      <Checkbox.Input />
    </Checkbox.Root>
  )
}

export const Disabled = () => {
  return (
    <Checkbox.Root id="disabled" disabled>
      <Checkbox.Indicator>indicator</Checkbox.Indicator>
      <Checkbox.Input />
    </Checkbox.Root>
  )
}
