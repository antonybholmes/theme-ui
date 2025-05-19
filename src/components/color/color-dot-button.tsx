import { cn } from '@/lib/class-names'
import type { IButtonProps } from '../shadcn/ui/themed/button'
import { isLightColor } from './color-picker-button'

export function ColorDotButton({
  color,
  autoBorder = true,
  style,
  ...props
}: IButtonProps & { autoBorder?: boolean; color: string }) {
  const lightMode = isLightColor(color)

  const border =
    autoBorder && lightMode ? 'border-border/50' : 'border-transparent'

  return (
    <button
      className={cn('rounded-full w-3.5 h-3.5 shrink-0 aspect-square', border)}
      style={{ ...style, backgroundColor: color }}
      {...props}
    />
  )
}
