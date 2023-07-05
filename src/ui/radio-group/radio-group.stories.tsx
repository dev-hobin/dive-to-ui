import type { Meta } from '@storybook/react'

import * as RadioGroup from '.'

type RadioGroupType = typeof RadioGroup.Root

const meta: Meta<RadioGroupType> = {
  title: 'Component/RadioGroup',
  component: RadioGroup.Root,
}

export default meta

export const Basic = () => {
  return (
    <RadioGroup.Root name="radio-group">
      <RadioGroup.Item value="1">
        <RadioGroup.Input id="item-1" />
        <RadioGroup.Indicator>radio button 1</RadioGroup.Indicator>
      </RadioGroup.Item>

      <RadioGroup.Item value="2">
        <RadioGroup.Input id="item-2" />
        <RadioGroup.Indicator>radio button 2</RadioGroup.Indicator>
      </RadioGroup.Item>

      <RadioGroup.Item value="3">
        <RadioGroup.Input id="item-3" />
        <RadioGroup.Indicator>radio button 3</RadioGroup.Indicator>
      </RadioGroup.Item>
    </RadioGroup.Root>
  )
}
