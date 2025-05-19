import { Button, type IButtonProps } from '@/components/shadcn/ui/themed/button'

export function ToolbarButton({
  ripple = false,
  size = 'default',
  //pad = 'default',
  className,
  children,
  ...props
}: IButtonProps) {
  //const [hover, setHover] = useState(false)
  //const [down, setDown] = useState(false)

  return (
    <Button
      variant="muted"
      rounded="theme"
      size={size}
      className={className}
      ripple={ripple}
      {...props}
    >
      {children}
    </Button>
  )
}
