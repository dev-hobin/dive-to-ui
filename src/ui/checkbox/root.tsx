import { ReactNode, useEffect } from 'react'
import { useActor } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { MachineContext } from './context'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'
import { useCallbackRef } from '@/hooks/use-callback-ref'

type RootProps = {
  children: ReactNode
  id: string
  name?: string
  checked?: boolean | CheckedState
  onChange?: (checked: CheckedState) => void
}
export const Root = (props: RootProps) => {
  const { id, name, children, checked, onChange } = props

  const onCheckedChange = useCallbackRef(onChange)

  const [state, send, actorRef] = useActor(machine, {
    input: {
      id: id,
      name: name,
      checked: getCheckedState(checked),
      onCheckedChange: onCheckedChange,
    },
  })

  useEffect(() => {
    const snapshot = actorRef.getSnapshot()
    if (!snapshot) return

    const nextChecked = getCheckedState(checked)
    if (snapshot.context.checkedState !== nextChecked) {
      send({ type: 'CHECKED.SET', value: nextChecked })
    }
  }, [actorRef, checked, send])

  return (
    <MachineContext.Provider value={actorRef}>
      <pre>{JSON.stringify({ value: state.value, context: state.context }, null, 2)}</pre>
      {children}
    </MachineContext.Provider>
  )
}

const getCheckedState = (checked: RootProps['checked']): CheckedState => {
  if (!checked) return 'unchecked'
  if (typeof checked === 'boolean') {
    return checked ? 'checked' : 'unchecked'
  }
  return checked
}
