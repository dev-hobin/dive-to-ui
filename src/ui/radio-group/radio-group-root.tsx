import { ReactNode } from 'react'
import { RadioGroupContext } from './context'
import { useRadioGroup } from './use-radio-group'

type RootProps = {
  children?: ReactNode
}
export const Root = (props: RootProps) => {
  const checkbox = useRadioGroup({})

  return <RadioGroupContext.Provider value={checkbox}>{props.children}</RadioGroupContext.Provider>
}

Root.displayName = 'RadioGroup.Root'
