import { type IButtonProps } from '@/components/shadcn/ui/themed/button'
import { cn } from '@lib/class-names'

import { BaseMenuButton } from './base-menu-button'

export function MenuButton({
  ref,
  className,
  children,
  ...props
}: IButtonProps) {
  return (
    <BaseMenuButton
      ref={ref}
      size="2xl"
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </BaseMenuButton>
  )
}
