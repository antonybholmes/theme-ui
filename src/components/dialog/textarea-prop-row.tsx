import { type ReactNode } from 'react'

import { cn } from '@lib/class-names'
import { BaseRow } from '../layout/base-row'
import { VCenterRow } from '../layout/v-center-row'
import { Label } from '../shadcn/ui/themed/label'
import { Textarea, type ITextAreaProps } from '../shadcn/ui/themed/textarea'

interface IProps extends ITextAreaProps {
  title: string
  labelClassName?: string
  leftChildren?: ReactNode
  rightChildren?: ReactNode
  textareaCls?: string
}

export function TextareaPropRow({
  title = '',
  labelClassName,

  disabled = false,
  leftChildren,
  rightChildren,
  textareaCls,
  className,
  children,
  ...props
}: IProps) {
  return (
    <BaseRow
      className={cn('gap-x-2 justify-between items-center min-h-8', className)}
    >
      <Label className={labelClassName}>{title}</Label>

      {children && <VCenterRow className="gap-x-2">{children}</VCenterRow>}

      <Textarea className={textareaCls} {...props} />
    </BaseRow>
  )
}
