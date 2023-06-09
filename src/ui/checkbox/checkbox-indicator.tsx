import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'

export const Indicator = forwardRefWithAsChild<'div'>((props, forwardedRef) => {
  return <Dive.div {...props} ref={forwardedRef} />
})
