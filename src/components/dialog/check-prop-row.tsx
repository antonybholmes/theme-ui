import { cn } from '@lib/class-names'
import { VCenterRow } from '../layout/v-center-row'
import { Checkbox, type ICheckboxProps } from '../shadcn/ui/themed/check-box'
import { Label } from '../shadcn/ui/themed/label'

export function CheckPropRow({
  title = '',
  labelClassName,
  checked = false,
  onCheckedChange = () => {},
  disabled = false,
  className,
  children,
}: ICheckboxProps & { title: string; labelClassName?: string }) {
  return (
    <VCenterRow className="gap-x-2 justify-between min-h-8">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        data-enabled={!disabled}
      >
        <Label className={labelClassName}>{title}</Label>
      </Checkbox>

      <VCenterRow className={cn('gap-x-2', className)}>{children}</VCenterRow>
    </VCenterRow>
  )
}
