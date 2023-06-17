import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { MachineContext } from './context'

export const Indicator = forwardRefWithAsChild<'button'>((props, ref) => {
  const [state, send] = MachineContext.useActor()

  console.log(state)

  return <Dive.button {...props} ref={ref} />
})
