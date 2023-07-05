import { useContext } from 'react'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { RadioGroupContext } from './context'

export const Indicator = forwardRefWithAsChild<'span'>((props, ref) => {
  const {} = useContext(RadioGroupContext)!

  return <Dive.span {...props} ref={ref} />
})

Indicator.displayName = 'RadioGroup.Indicator'
