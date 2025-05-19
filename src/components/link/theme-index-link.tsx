import { type ILinkProps } from '@interfaces/link-props'
import { cn } from '@lib/class-names'
import { ArrowLink } from './arrow-link'

export function ThemeIndexLink({ className, children, ...props }: ILinkProps) {
  return (
    <ArrowLink
      className={cn('text-theme', className)}
      stroke="stroke-theme"
      {...props}
    >
      {children}
    </ArrowLink>
  )
}
