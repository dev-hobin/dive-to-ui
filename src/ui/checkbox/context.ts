import { createContext } from 'react'
import { UseCheckboxReturn } from './use-checkbox'

type CheckboxContextType = UseCheckboxReturn

export const CheckboxContext = createContext<CheckboxContextType | null>(null)
