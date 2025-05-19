import { BaseRow } from '@/components/layout/base-row'
import { type IDivProps } from '@interfaces/div-props'
import { cn } from '@lib/class-names'
import { forwardRef, type ForwardedRef } from 'react'

const CLS =
  'shrink-0 gap-x-1 text-xs bg-muted/25 grow p-1.5 rounded-lg dark:shadow-none justify-between items-end'

export const ToolbarTabPanel = forwardRef(function ToolbarTabPanel(
  { children, className, ...props }: IDivProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseRow ref={ref} className={cn(CLS, className)} {...props}>
      {children}
    </BaseRow>
  )
})
