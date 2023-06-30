import type { Meta } from '@storybook/react'

import * as RadioGroup from '.'

type RadioGroupType = typeof RadioGroup.Root

const meta: Meta<RadioGroupType> = {
  title: 'Component/Checkbox',
  component: RadioGroup.Root,
}

export default meta

export const Uncontrolled = () => {
  return <RadioGroup.Root></RadioGroup.Root>
}
