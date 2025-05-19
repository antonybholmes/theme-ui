import { cn } from '@/lib/class-names'
import type { ComponentProps } from 'react'
import { isLightColor } from './color-picker-button'

export function ColorDot({
  color,
  autoBorder = true,
  style,
  ...props
}: ComponentProps<'span'> & { autoBorder?: boolean; color: string }) {
  const lightMode = isLightColor(color)

  const border =
    autoBorder && lightMode ? 'border-border/50' : 'border-transparent'

  return (
    <span
      className={cn('rounded-full w-3.5 h-3.5 shrink-0 aspect-square', border)}
      style={{ ...style, backgroundColor: color }}
      {...props}
    />
  )
}
