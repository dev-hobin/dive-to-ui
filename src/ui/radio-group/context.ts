import { createContext } from 'react'
import { ActorRefFrom } from 'xstate'
import { machine } from '@/machines/radio-group'

export const MachineContext = createContext<ActorRefFrom<typeof machine> | null>(null)
