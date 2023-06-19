import { useContext, useEffect, useLayoutEffect } from 'react'
import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { MachineContext } from './context'
import { useLatestValue } from '@/hooks/use-latest-value'
import { RadioItem } from '@/machines/radio-group/radio-group.machine'

type ItemProps = {
  value: string
  required?: boolean
}
export const Item = forwardRefWithAsChild<'button', ItemProps>((props, ref) => {
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)

  const value = useLatestValue(props.value)
  const disabled = useLatestValue(props.disabled)
  const required = useLatestValue(props.required)

  useLayoutEffect(() => {
    send({
      type: 'ITEM.ADD',
      payload: {
        item: {
          value: value,
          disabled: disabled ?? false,
          required: required ?? false,
        },
      },
    })

    return () => {
      send({ type: 'ITEM.REMOVE', payload: { value: value } })
    }
  }, [disabled, required, value, send])

  useEffect(() => {
    const updateInfo: Partial<RadioItem> = {}

    if (props.disabled !== undefined) updateInfo.disabled = props.disabled
    if (props.required !== undefined) updateInfo.required = props.required

    send({
      type: 'ITEM.UPDATE',
      payload: {
        value: value,
        update: updateInfo,
      },
    })
  }, [props.disabled, props.required, value, send])

  return (
    <Dive.button role="radio" aria-checked {...props} ref={ref}>
      {props.children}
    </Dive.button>
  )
})
