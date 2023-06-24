import { createContext } from 'react'
import { ActorRefFrom } from 'xstate'
import { machine } from '@/machines/checkbox'

export const MachineContext = createContext<ActorRefFrom<typeof machine> | null>(null)
