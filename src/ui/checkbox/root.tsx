import { ReactNode } from 'react'
import { useActor } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { MachineContext } from './context'

type RootProps = {
  children: ReactNode
  id: string
  name?: string
}
export const Root = (props: RootProps) => {
  const { id, name, children } = props
  const [state, send, actorRef] = useActor(machine, {
    input: {
      id: id,
      name: name,
    },
  })

  return (
    <MachineContext.Provider value={actorRef}>
      <pre>{JSON.stringify({ value: state.value, context: state.context }, null, 2)}</pre>
      {children}
    </MachineContext.Provider>
  )
}
