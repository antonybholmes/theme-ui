import { IndexArrowIcon } from '@icons/index-arrow'
import { type ILinkProps } from '@interfaces/link-props'
import { cn } from '@lib/class-names'
import { BaseLink } from './base-link'

export function ArrowLink({
  stroke = 'stroke-foreground',
  className,
  children,
  ...props
}: ILinkProps & { stroke?: string }) {
  return (
    <BaseLink
      className={cn('inline-flex flex-row items-center gap-x-1', className)}
      {...props}
    >
      {children}

      <IndexArrowIcon className="w-4" stroke={stroke} />
    </BaseLink>
  )
}
