import { createContext } from 'react'
import { ActorRefFrom } from 'xstate'
import { machine } from '@/machines/checkbox'

export const ActorContext = createContext<ActorRefFrom<typeof machine> | null>(null)
