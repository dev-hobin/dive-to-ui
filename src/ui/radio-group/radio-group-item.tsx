import { useContext } from 'react'
import { RadioGroupContext } from './context'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'

export const Item = forwardRefWithAsChild<'span'>((props, ref) => {
  const {} = useContext(RadioGroupContext)!

  return (
    <Dive.span {...props} ref={ref}>
      {props.children || 'Radio'}
    </Dive.span>
  )
})

Item.displayName = 'RadioGroup.Item'
