import { Button, type IButtonProps } from '@components/shadcn/ui/themed/button'
import { forwardRef, type ForwardedRef } from 'react'

export const LinkButton = forwardRef(function LinkButton(
  {
    variant = 'link',

    ripple = false,
    size = 'none',
    justify = 'start',
    className,
    children,
    ...props
  }: IButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      ripple={ripple}
      size={size}
      justify={justify}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
})
