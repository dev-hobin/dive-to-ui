import type { Meta, StoryObj } from '@storybook/react'

import * as Checkbox from '.'

type CheckboxType = typeof Checkbox.Root

const meta: Meta<CheckboxType> = {
  title: 'Component/Checkbox',
  component: Checkbox.Root,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      options: [true, false, 'checked', 'unchecked', 'indeterminate'],
      control: { type: 'radio' },
    },
  },
}

export default meta

type Story = StoryObj<CheckboxType>

export const Basic: Story = {
  render: (props) => {
    return (
      <Checkbox.Root id={props.id || 'basic'} checked={props.checked}>
        <Checkbox.Indicator />
        <Checkbox.Input />
      </Checkbox.Root>
    )
  },
}
