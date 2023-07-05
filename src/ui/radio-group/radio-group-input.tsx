import { useContext } from 'react'
import { RadioGroupContext, RadioItemContext } from './context'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { mergeProps } from '@/utils/merge-props'

type InputProps = { value?: 'Item 컴포넌트의 prop으로 사용되어야 합니다' }
export const Input = forwardRefWithAsChild<'input', InputProps>((props, ref) => {
  const { getInputProps } = useContext(RadioGroupContext)!

  const itemContext = useContext(RadioItemContext)
  if (!itemContext) throw 'Input 컴포넌트는 Item 안에서 사용되어야 합니다.'

  const mergedProps = mergeProps(getInputProps(itemContext.value), props)
  return <Dive.input {...mergedProps} ref={ref} />
})

Input.displayName = 'RadioGroup.Input'
