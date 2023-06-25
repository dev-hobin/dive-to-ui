import type { Meta } from '@storybook/react'

import * as Checkbox from '.'

type CheckboxType = typeof Checkbox.Root

const meta: Meta<CheckboxType> = {
  title: 'Component/Checkbox',
  component: Checkbox.Root,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

export const Basic = () => {
  return (
    <Checkbox.Root id="basic">
      <Checkbox.Indicator>indicator</Checkbox.Indicator>
      <Checkbox.Input />
    </Checkbox.Root>
  )
}
