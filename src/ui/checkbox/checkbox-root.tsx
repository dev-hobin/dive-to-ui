import { ReactNode } from 'react'
import { CheckboxMachineContext } from './checkbox.context'

type RootProps = { children: ReactNode }
export const Root = ({ children }: RootProps) => {
  return <CheckboxMachineContext.Provider>{children}</CheckboxMachineContext.Provider>
}
