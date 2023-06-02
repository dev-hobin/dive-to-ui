import React from 'react'
import { Assign } from '@/types'

type AsChildProp = {
  asChild?: boolean
}

export const forwardRefWithAsChild = <E extends React.ElementType, P = {}>(
  component: React.ForwardRefRenderFunction<
    React.ElementRef<E>,
    Assign<React.ComponentProps<E>, P & AsChildProp>
  >,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Assign<React.ComponentProps<E>, P & AsChildProp>> &
    React.RefAttributes<React.ElementRef<E>>
> => {
  return React.forwardRef(component)
}
