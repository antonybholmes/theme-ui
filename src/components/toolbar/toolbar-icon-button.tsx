import { type IButtonProps } from '@/components/shadcn/ui/themed/button'
import { ToolbarButton } from './toolbar-button'

export function ToolbarIconButton({
  ref,
  variant = 'muted',
  size = 'icon',

  className,
  children,
  ...props
}: IButtonProps) {
  return (
    <ToolbarButton
      ref={ref}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </ToolbarButton>
  )
}
