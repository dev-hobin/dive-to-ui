import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/core/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { machine } from '@/machine/checkbox'

export const Checkbox = forwardRefWithAsChild<'div'>((props, ref) => {
  const [state, send] = useActor(machine)

  return <Dive.div {...props} ref={ref} />
})
