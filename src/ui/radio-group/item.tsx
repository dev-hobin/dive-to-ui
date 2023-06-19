import { useContext, useEffect, useLayoutEffect } from 'react'
import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { MachineContext } from './context'

type ItemProps = {
  value: string
  required?: boolean
}
export const Item = forwardRefWithAsChild<'button', ItemProps>((props, ref) => {
  const service = useContext(MachineContext)!
  const [state, send] = useActor(service)

  useLayoutEffect(() => {
    send({
      type: 'ITEM.ADD',
      payload: {
        item: {
          value: props.value,
          disabled: props.disabled ?? false,
          required: props.required ?? false,
        },
      },
    })

    return () => {
      send({ type: 'ITEM.REMOVE', payload: { value: props.value } })
    }
  }, [props.disabled, props.required, props.value, send])

  return (
    <Dive.button role="radio" aria-checked {...props} ref={ref}>
      {props.children}
    </Dive.button>
  )
})
