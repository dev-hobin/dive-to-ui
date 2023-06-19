import { createContext } from 'react'
import { InterpreterFrom } from 'xstate'
import { machine } from '@/machines/radio-group'

export const MachineContext = createContext<InterpreterFrom<typeof machine> | null>(null)
