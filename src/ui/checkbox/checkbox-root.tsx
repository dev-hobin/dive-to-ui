import { ReactNode, useEffect } from 'react'
import { useActor } from '@xstate/react'
import { machine } from '@/machines/checkbox'
import { CheckboxContext } from './context'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'
import { useCheckbox } from './use-checkbox'

type RootProps = {
  children: ReactNode
  id: string
  name?: string
  checked?: boolean | CheckedState
  onChange?: (checked: CheckedState) => void
}
export const Root = (props: RootProps) => {
  const checkbox = useCheckbox({
    id: props.id,
    name: props.name,
    checkedState: getCheckedState(props.checked),
    onCheckedChange: props.onChange,
  })

  return (
    <CheckboxContext.Provider value={checkbox}>
      <pre>
        {JSON.stringify({ value: checkbox.state.value, context: checkbox.state.context }, null, 2)}
      </pre>
      {props.children}
    </CheckboxContext.Provider>
  )
}

const getCheckedState = (checked: RootProps['checked']): CheckedState => {
  if (!checked) return 'unchecked'
  if (typeof checked === 'boolean') {
    return checked ? 'checked' : 'unchecked'
  }
  return checked
}

Root.displayName = 'Checkbox.Root'
