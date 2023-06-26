import { useContext } from 'react'
import { Dive } from '@/core/dive'
import { forwardRefWithAsChild } from '@/utils/forward-ref-with-as-child'
import { CheckboxContext } from './context'
import { mergeProps } from '@/utils/merge-props'

export const Indicator = forwardRefWithAsChild<'button'>((props, ref) => {
  const { indicatorProps } = useContext(CheckboxContext)!
  const mergedProps = mergeProps(props, indicatorProps)

  return <Dive.button {...mergedProps} ref={ref} />
})

Indicator.displayName = 'Checkbox.Indicator'
