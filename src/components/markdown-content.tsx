import type { IDivProps } from '@interfaces/div-props'
import { cn } from '@lib/class-names'

export function MarkdownContent({
  ref,
  className,
  children,
  ...props
}: IDivProps) {
  return (
    <main ref={ref} className={cn('markdown', className)} {...props}>
      {children}
    </main>
  )
}
