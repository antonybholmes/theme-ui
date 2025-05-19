import { BaseCol } from '@/components/layout/base-col'
import { ContentDiv } from '@/components/layout/content-div'

import { VCenterCol } from '@/components/layout/v-center-col'
import { cn } from '@lib/class-names'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'

interface ICardContainerProps extends HTMLAttributes<HTMLDivElement> {
  gap?: string
}

export const CardContainer = forwardRef<HTMLDivElement, ICardContainerProps>(
  ({ className, gap = 'gap-y-4', children }, ref) => (
    <ContentDiv className="py-8" ref={ref}>
      <BaseCol className={cn(gap, className)}>{children}</BaseCol>
    </ContentDiv>
  )
)
CardContainer.displayName = 'CardContainer'

export const CenteredCardContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { gap?: string }
>(({ gap = 'gap-y-4', children }, ref) => (
  <VCenterCol ref={ref} className="grow">
    <CardContainer gap={gap}>{children}</CardContainer>
  </VCenterCol>
))
CenteredCardContainer.displayName = 'CenteredCardContainer'

export const variants = cva('border border-border/50 rounded-card', {
  variants: {
    variant: {
      default: 'bg-background p-5',
      content: 'bg-white p-2',
    },

    gap: {
      default: 'gap-y-4',
      sm: 'gap-y-2',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    gap: 'default',
  },
})

const Card = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>
>(({ variant, gap, className, ...props }, ref) => (
  <BaseCol
    ref={ref}
    className={variants({ variant, gap, className })}
    {...props}
  />
))
Card.displayName = 'Card'

const SecondaryCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-2xl bg-muted text-foreground', className)}
    {...props}
  />
))
SecondaryCard.displayName = 'SecondaryCard'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  SecondaryCard,
}
