import { VCenterRow } from '@/components/layout/v-center-row'

import { type IDivProps } from '@interfaces/div-props'
import { cn } from '@lib/class-names'
import { type ReactNode } from 'react'
import { HCenterCol } from '../layout/h-center-col'

interface IProps extends IDivProps {
  name?: string
  showTitle?: string
}

export function ToolbarTabGroup({
  name,
  title,
  showTitle,
  className,
  children,
  ...props
}: IProps) {
  let ret: ReactNode = (
    <VCenterRow
      id={name}
      aria-label={name}
      className={cn('shrink-0 text-xs items-stretch', className)}
      {...props}
    >
      {children}
    </VCenterRow>
  )

  if (showTitle && title) {
    ret = (
      <HCenterCol className="gap-y-1">
        {ret}
        <VCenterRow className="h-4">
          <span className="text-xxs text-foreground/75 tracking-wide">
            {title}
          </span>
        </VCenterRow>
      </HCenterCol>
    )
  }

  return ret
}
