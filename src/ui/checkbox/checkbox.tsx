import { useEffect, useMemo, useRef } from 'react'
import { useActor } from '@xstate/react'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'
import { machine } from '@/machines/checkbox'

export const Checkbox = forwardRefWithAsChild<'input'>((props, forwardedRef) => {
  const [state, send] = useActor(machine)

  return <Dive.input {...props} ref={forwardedRef} />
})
