import { ReactNode } from 'react'
import { RadioGroupContext } from './context'
import { useRadioGroup } from './use-radio-group'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'

type RootProps = {
  children?: ReactNode
}
export const Root = forwardRefWithAsChild<'div', RootProps>((props, ref) => {
  const radioGroup = useRadioGroup({})

  return (
    <RadioGroupContext.Provider value={radioGroup}>
      <Dive.div role="radiogroup" {...props} ref={ref}>
        {props.children}
      </Dive.div>
    </RadioGroupContext.Provider>
  )
})

Root.displayName = 'RadioGroup.Root'
