import type { IDivProps } from '@interfaces/div-props'
import { cn } from '@lib/class-names'
import { forwardRef, type ForwardedRef } from 'react'

export const BaseCol = forwardRef(function BaseCol(
  { className, children, ...props }: IDivProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  )
})
