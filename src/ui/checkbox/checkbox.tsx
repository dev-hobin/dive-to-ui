import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { machine } from '@/machines/checkbox'

export const Checkbox = forwardRefWithAsChild<'input'>((props, forwardedRef) => {
  const [state, send] = useActor(machine)

  console.log('context', state.context)

  const isChecked = state.context.checked

  return (
    <Dive.input
      {...props}
      type="checkbox"
      onClick={() => send({ type: 'CHECKED.SET', params: { checked: !isChecked } })}
      ref={forwardedRef}
    />
  )
})
