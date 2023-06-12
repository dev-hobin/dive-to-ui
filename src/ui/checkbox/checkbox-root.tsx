import { ReactNode, useEffect } from 'react'
import { useActorRef } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { ActorContext } from './checkbox.context'

type RootProps = { children: ReactNode; disabled?: boolean }
export const Root = ({ children, disabled }: RootProps) => {
  const actorRef = useActorRef(machine, {
    input: {
      disabled,
    },
  })

  useEffect(() => {
    if (disabled === undefined) return

    if (disabled) {
      actorRef.send({ type: 'SET_DISABLED' })
    } else {
      actorRef.send({ type: 'SET_ENABLED' })
    }
  }, [actorRef, disabled])

  return <ActorContext.Provider value={actorRef}>{children}</ActorContext.Provider>
}
