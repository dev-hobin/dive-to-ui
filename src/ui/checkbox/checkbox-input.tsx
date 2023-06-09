import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { CheckboxMachineContext } from './checkbox.context'

export const Input = forwardRefWithAsChild<'input'>((props, forwardedRef) => {
  const { send } = CheckboxMachineContext.useActorRef()

  return (
    <Dive.input
      {...props}
      type="checkbox"
      onChange={(e) => send({ type: 'CHECKED.SET', payload: { checked: e.target.checked } })}
      ref={forwardedRef}
    />
  )
})
