import { ReactNode } from 'react'
import { MachineContext } from './context'
import { machine } from '@/machines/checkbox'

type RootProps = {
  children: ReactNode
  id: string
  name?: string
  required?: boolean
  value?: string
  disabled?: boolean
}
export const Root = ({ children, id, name, required, value, disabled }: RootProps) => {
  return (
    <MachineContext.Provider
      machine={() =>
        machine.withConfig(
          {},
          {
            checked: 'unchecked',
            id: id,
            name: name ?? '',
            disabled: disabled ?? false,
            required: required ?? false,
            value: value ?? 'on',
          },
        )
      }
    >
      {children}
    </MachineContext.Provider>
  )
}
