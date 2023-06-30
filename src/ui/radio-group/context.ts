import { createContext } from 'react'
import { type UseRadioGroupReturn } from './use-radio-group'

type RadioGroupContextType = UseRadioGroupReturn

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null)
