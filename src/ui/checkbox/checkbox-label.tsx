import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'

export const Label = forwardRefWithAsChild<'label'>((props, forwardedRef) => {
  return <Dive.label {...props} ref={forwardedRef} />
})
