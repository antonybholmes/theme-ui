import { Button, type IButtonProps } from '@components/shadcn/ui/themed/button'

export function IconButton({
  ref,
  variant = 'muted',
  size = 'icon',

  ripple = false,
  aspect = 'icon',
  className,
  children,
  ...props
}: IButtonProps) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      ripple={ripple}
      aspect={aspect}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}
