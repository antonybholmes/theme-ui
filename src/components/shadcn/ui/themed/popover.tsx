import * as PopoverPrimitive from '@radix-ui/react-popover'

import { type VariantProps } from 'class-variance-authority'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react'
import { dropdownContentVariants } from './dropdown-menu'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

// const POP_CLS = cn(
//   CONTENT_CLS,
//   'z-modal z-(--z-modal) outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
//   'data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
//   'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
//   'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
// )

// export const popoverContentVariants = cva(POP_CLS, {
//   variants: {
//     variant: {
//       default: 'bg-background',
//       glass: GLASS_CLS,
//       trans: '',
//     },
//   },
//   defaultVariants: {
//     variant: 'default',
//   },
// })

const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    VariantProps<typeof dropdownContentVariants>
>(
  (
    {
      className,
      variant = 'default',
      align = 'start',
      sideOffset = 4,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={dropdownContentVariants({ variant, className })}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
