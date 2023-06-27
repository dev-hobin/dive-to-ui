import { ReactNode } from 'react'
import { CheckboxContext } from './context'
import { CheckedState } from '@/machines/checkbox/checkbox.machine'
import { useCheckbox } from './use-checkbox'

type RootProps = {
  children: ReactNode
  id: string
  name?: string
  checked?: boolean | CheckedState
  onChange?: (checked: CheckedState) => void
  value?: string
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
}
export const Root = (props: RootProps) => {
  const checkbox = useCheckbox({
    id: props.id,
    name: props.name,
    checkedState: getCheckedState(props.checked ?? props.defaultChecked),
    onCheckedChange: props.onChange,
    value: props.value,
    disabled: props.disabled,
    required: props.required,
  })

  return <CheckboxContext.Provider value={checkbox}>{props.children}</CheckboxContext.Provider>
}

const getCheckedState = (checked: RootProps['checked']): CheckedState => {
  if (!checked) return 'unchecked'
  if (typeof checked === 'boolean') {
    return checked ? 'checked' : 'unchecked'
  }
  return checked
}

Root.displayName = 'Checkbox.Root'
