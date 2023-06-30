import { useContext } from 'react'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { RadioGroupContext } from './context'

export const Indicator = forwardRefWithAsChild<'button'>((props, ref) => {
  const {} = useContext(RadioGroupContext)!

  return <Dive.button {...props} ref={ref} />
})

Indicator.displayName = 'RadioGroup.Indicator'
