import { cn } from '@lib/class-names'
import * as LabelPrimitive from '@radix-ui/react-label'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react'

// const labelVariants = cva(
//   'peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shrink-0',
//   {
//     variants: {
//       variant: {
//         default: 'font-semibold',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//     },
//   }
// )

export const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shrink-0',
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
