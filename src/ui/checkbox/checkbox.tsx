import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { machine } from '@/machines/checkbox'

export const Checkbox = forwardRefWithAsChild<'input'>((props, forwardedRef) => {
  const [state, send] = useActor(machine)

  return (
    <Dive.input
      {...props}
      type="checkbox"
      onChange={(e) => send({ type: 'CHECKED.SET', params: { checked: e.target.checked } })}
      ref={forwardedRef}
    />
  )
})
