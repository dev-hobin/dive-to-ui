import { ReactNode } from 'react'
import { RadioGroupContext } from './context'
import { useRadioGroup } from './use-radio-group'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'

type RootProps = {
  children?: ReactNode
  name: string
}
export const Root = forwardRefWithAsChild<'div', RootProps>((props, ref) => {
  const radioGroup = useRadioGroup({
    name: props.name,
  })

  return (
    <RadioGroupContext.Provider value={radioGroup}>
      <Dive.div role="radiogroup" {...props} ref={ref} />
    </RadioGroupContext.Provider>
  )
})

Root.displayName = 'RadioGroup.Root'
