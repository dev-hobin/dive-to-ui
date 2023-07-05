import { useContext } from 'react'
import { RadioGroupContext, RadioItemContext } from './context'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { Dive } from '@/core/dive'

type ItemProps = {
  value: string
}
export const Item = forwardRefWithAsChild<'span', ItemProps>((props, ref) => {
  const {} = useContext(RadioGroupContext)!
  const { value, ...rest } = props

  return (
    <RadioItemContext.Provider value={{ value: value }}>
      <Dive.span {...rest} ref={ref} />
    </RadioItemContext.Provider>
  )
})

Item.displayName = 'RadioGroup.Item'
