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
    <RadioGroup.Root>
      <RadioGroup.Input id="item-1" value="1" name="radio-group" />
      <RadioGroup.Indicator>radio button</RadioGroup.Indicator>
      <label htmlFor="item-1">radio-label-1</label>

      <RadioGroup.Input id="item-2" value="2" name="radio-group" />
      <RadioGroup.Indicator>radio button</RadioGroup.Indicator>
      <label htmlFor="item-2">radio-label-2</label>

      <RadioGroup.Input id="item-3" value="3" name="radio-group" />
      <RadioGroup.Indicator>radio button</RadioGroup.Indicator>
      <label htmlFor="item-3">radio-label-3</label>
    </RadioGroup.Root>
  )
}
