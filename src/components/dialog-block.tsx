import { BaseCol } from '@/components/layout/base-col'
import { H3_CLS } from '@/theme'
import { type IDivProps } from '@interfaces/div-props'
import { cn } from '@lib/class-names'

interface IProps extends IDivProps {
  title?: string
  gap?: string
}

export function DialogBlock({
  title,
  gap = 'gap-y-1',
  className,
  children,
}: IProps) {
  return (
    <BaseCol className="gap-y-2 rounded-lg bg-muted px-3 py-2">
      {title && <h3 className={H3_CLS}>{title}</h3>}

      <BaseCol className={cn(gap, className)}>{children}</BaseCol>
    </BaseCol>
  )
}
