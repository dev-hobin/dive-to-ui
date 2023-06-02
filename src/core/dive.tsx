import React from 'react'
import {
  AsChildForwardRefExoticComponent,
  forwardRefWithAsChild,
} from './utils/forward-ref-with-as-child'
import { composeRefs } from './utils/compose-refs'
import { mergeProps } from './utils/merge-props'

type Divers = { [E in (typeof NODES)[number]]: AsChildForwardRefExoticComponent<E> }

const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
] as const

export const Dive = NODES.reduce((divers, node) => {
  const Component = forwardRefWithAsChild((props, ref) => {
    const { asChild, children, ...restProps } = props

    if (!asChild) {
      const Comp = node as React.ElementType
      return (
        <Comp {...restProps} ref={ref}>
          {children}
        </Comp>
      )
    }

    const onlyChild = React.Children.only(children)

    return React.isValidElement(onlyChild)
      ? React.cloneElement(onlyChild, {
          ...mergeProps(restProps, onlyChild.props as any),
          ref: ref ? composeRefs(ref, (onlyChild as any).ref) : (onlyChild as any).ref,
        })
      : null
  })

  Component.displayName = Component.displayName || Component.name

  return { ...divers, [node]: Component }
}, {} as Divers)
