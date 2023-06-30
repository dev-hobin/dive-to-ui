import type { Meta } from '@storybook/react'

import * as RadioGroup from '.'

type RadioGroupType = typeof RadioGroup.Root

const meta: Meta<RadioGroupType> = {
  title: 'Component/RadioGroup',
  component: RadioGroup.Root,
}

export default meta

export const Uncontrolled = () => {
  return (
    <RadioGroup.Root>
      <RadioGroup.Item>
        <RadioGroup.Indicator>radio button</RadioGroup.Indicator>
        radio-label-1
      </RadioGroup.Item>
      <RadioGroup.Item>
        <RadioGroup.Indicator>radio button</RadioGroup.Indicator>
        radio-label-2
      </RadioGroup.Item>
      <RadioGroup.Item>
        <RadioGroup.Indicator>radio button</RadioGroup.Indicator>
        radio-label-3
      </RadioGroup.Item>
    </RadioGroup.Root>
  )
}
