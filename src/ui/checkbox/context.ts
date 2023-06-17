import { createContext } from 'react'
import { InterpreterFrom } from 'xstate'
import { machine } from '@/machines/checkbox'

export const MachineContext = createContext<InterpreterFrom<typeof machine> | null>(null)
