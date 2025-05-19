import { type ReactNode } from 'react'

import { H2_CLS } from '@/theme'
import { cn } from '@lib/class-names'
import { BaseRow } from '../layout/base-row'
import { VCenterRow } from '../layout/v-center-row'
import { Input, type IInputProps } from '../shadcn/ui/themed/input'
import { Label } from '../shadcn/ui/themed/label'

export const PROPS_TITLE_CLS = cn(H2_CLS, 'py-2')

interface IProps extends IInputProps {
  title: string
  labelClassName?: string
  leftChildren?: ReactNode
  rightChildren?: ReactNode
}

export function TextPropRow({
  title = '',
  labelClassName,
  checked = false,

  disabled = false,
  leftChildren,
  rightChildren,
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

      <Input {...props} />
    </BaseRow>
  )
}
