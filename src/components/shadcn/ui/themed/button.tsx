import type { IPos } from '@interfaces/pos'

import {
  BASE_BUTTON_CLS,
  BASE_ICON_BUTTON_CLS,
  BUTTON_H_CLS,
  CENTERED_ROW_CLS,
  CORE_PRIMARY_BUTTON_CLS,
  CORE_PRIMARY_COLOR_BUTTON_CLS,
  DESTRUCTIVE_CLS,
  DROPDOWN_BUTTON_CLS,
  FOCUS_RING_CLS,
  ICON_BUTTON_CLS,
  LARGE_ICON_BUTTON_CLS,
  LG_BUTTON_H_CLS,
  MD_BUTTON_H_CLS,
  SM_BUTTON_H_CLS,
  SM_ICON_BUTTON_CLS,
  TOOLBAR_DROPDOWN_BUTTON_CLS,
  TRANS_COLOR_CLS,
  XL_BUTTON_H_CLS,
  XS_ICON_BUTTON_CLS,
  XXL_BUTTON_H_CLS,
} from '@/theme'
import type { ITooltipSide } from '@interfaces/tooltip-side-props'
import { cn } from '@lib/class-names'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import gsap from 'gsap'
import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { SimpleTooltip } from './tooltip'

const BASE_GHOST_CLS =
  'border border-transparent bg-muted hover:bg-accent data-[selected=true]:bg-accent'

export const BASE_OUTLINE_CLS = cn(
  FOCUS_RING_CLS,
  'focus:border-ring hover:border-ring bg-background border border-border data-[selected=true]:border-ring'
)

export const BASE_IOS_CLS = cn(
  'border border-transparent hover:border-border/75 hover:bg-background/75',
  'data-[selected=true]:bg-background/75 data-[selected=true]:border-border/75',
  'data-[state=open]:bg-background/75 data-[state=open]:border-border/75'
)

export const BASE_SECONDARY_CLS = cn(
  FOCUS_RING_CLS,
  'bg-background border border-border data-[selected=false]:hover:bg-faint',
  'data-[selected=true]:bg-faint data-[state=open]:bg-faint'
)

export const BASE_MUTED_CLS = cn(
  'border border-transparent data-[selected=false]:hover:bg-muted',
  'data-[selected=true]:bg-muted data-[state=open]:bg-muted'
)

export const THEME_MUTED_CLS = cn(
  'border border-transparent data-[selected=false]:hover:bg-theme/25',
  'data-[selected=true]:bg-theme/25 data-[state=open]:bg-theme/25'
)

export const ACCENT_BUTTON_CLS =
  'data-[mode=flat]:bg-accent data-[mode=flat]:hover:bg-accent hover:bg-accent'

// export const BASE_TOOLBAR_CLS = cn(
//   'border border-transparent data-[selected=false]:hover:bg-muted/50',
//   'data-[selected=true]:bg-muted/50 data-[state=open]:bg-muted/50'
// )

// export const BASE_MUTED_THEME_CLS = cn(
//   'border border-transparent hover:bg-theme-muted data-[selected=false]:hover:bg-theme-muted',
//   'data-[selected=true]:bg-theme-muted data-[state=open]:bg-theme-muted'
// )

// const BASE_ACCENT_CLS =
//   'hover:bg-muted/30 data-[selected=true]:bg-muted/30 data-[state=open]:bg-muted/30'

export const BASE_MENU_CLS = cn(
  'border border-transparent focus:bg-muted',
  'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  'hover:bg-muted',
  'fill-foreground stroke-foreground px-1 data-[selected=true]:bg-muted/50',
  'data-[checked=true]:bg-muted/50 data-[checked=true]:border-border'
)

export const THEME_MENU_CLS = cn(
  'focus:bg-theme/50 focus:text-white focus:fill-white focus:stroke-white',
  'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  'hover:bg-theme/50 hover:text-white hover:fill-white hover:stroke-white',
  'fill-foreground stroke-foreground px-1 data-[selected=true]:bg-theme/50 data-[selected=true]:stroke-white data-[selected=true]:text-white'
)

export const DROPDOWN_MENU_ICON_CONTAINER_CLS =
  'w-7 aspect-square flex flex-row items-center shrink-0 grow-0 justify-center'

const LINK_CLS = cn(
  FOCUS_RING_CLS,
  'text-theme underline-offset-4 hover:underline'
)

const RED_LINK_CLS = cn(
  FOCUS_RING_CLS,
  'text-red-500 underline-offset-4 hover:underline'
)

export const RIPPLE_CLS =
  'pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 w-4 h-4'

// export const buttonVariants = cva(BASE_BUTTON_CLS, {
//   variants: {
//     variant: {
//       none: "",
//       default: CORE_PRIMARY_BUTTON_CLS,
//       primary: CORE_PRIMARY_BUTTON_CLS,
//       "theme": CORE_PRIMARY_COLOR_BUTTON_CLS,
//       destructive: DESTRUCTIVE_CLS,
//       trans: "hover:bg-white/25 data-[selected=true]:bg-white/25",
//       outline: OUTLINE_BUTTON_CLS,
//       ghost: BASE_GHOST_CLS,
//       muted: BASE_MUTED_CLS,
//       accent: BASE_ACCENT_CLS,
//       toolbar: BASE_TOOLBAR_CLS,
//       side: "hover:bg-background",
//       menu: BASE_MENU_CLS,
//       link: LINK_CLS,
//       footer: "hover:bg-primary/20 data-[selected=true]:bg-primary/20",
//     },
//     font: {
//       none: "",
//       default: "font-normal",
//       normal: "font-normal",
//       medium: "font-medium",
//       semibold: "font-semibold",
//     },
//     rounded: {
//       none: "",
//       default: "rounded-sm",
//       xs: "rounded-xs",
//       sm: "rounded-xs",
//       md: "rounded-md",
//       lg: "rounded-lg",
//       full: "rounded-full ",
//     },
//     ring: {
//       default: "ring-offset-1",
//       "offset-1": "ring-offset-1",
//       "offset-2": "ring-offset-2",
//       inset: "ring-inset",
//     },
//     items: {
//       default: "items-center",
//       center: "items-center",
//       start: "items-start",
//       end: "items-end",
//     },
//     justify: {
//       default: "justify-center",
//       center: "justify-center",
//       start: "justify-start",
//       end: "justify-end",
//     },
//     size: {
//       default: BUTTON_H_CLS,
//       base: BUTTON_H_CLS,
//       //narrow: cn(BUTTON_H_CLS, "w-5 justify-center"),
//       tab: "px-2 h-7 justify-center",
//       sm: SMALL_BUTTON_H_CLS,
//       md: MEDIUM_BUTTON_H_CLS,
//       lg: LARGE_BUTTON_H_CLS,
//       xl: XL_BUTTON_H_CLS,
//       xxl: XXL_BUTTON_H_CLS,
//       icon: cn(ICON_BUTTON_CLS, "justify-center"),
//       "icon-lg": cn(
//         BASE_ICON_BUTTON_CLS,
//         CENTERED_ROW_CLS,
//         LARGE_ICON_BUTTON_CLS,
//       ),
//       "icon-md": cn(
//         BASE_ICON_BUTTON_CLS,
//         CENTERED_ROW_CLS,
//         MEDIUM_BUTTON_H_CLS,
//       ),
//       "icon-sm": SM_ICON_BUTTON_CLS,
//       "icon-xs": XS_ICON_BUTTON_CLS,
//       none: "",
//     },
//     pad: {
//       none: "",
//       default: "px-4",
//       md: "px-3",
//       sm: "px-2",
//       xs: "px-1",
//     },
//     gap: {
//       none: "",
//       default: "gap-x-2",
//       sm: "gap-x-1",
//       xs: "gap-x-0.5",
//     },
//     animation: {
//       default: TRANS_COLOR_CLS,
//       color: TRANS_COLOR_CLS,
//       none: "",
//     },
//   },
// defaultVariants: {
//   variant: "primary",
//   justify: "center",
//   items: "center",
//   gap: "base",
//   size: "base",
//   font: "normal",
//   ring: "offset-1",
//   rounded: "base",
//   pad: "base",
//   animation: "default",
// },
// })

// export const buttonVariants2 = cv(BASE_BUTTON_CLS, {
//   variants: {
//     variant: {
//       none: '',
//       primary: CORE_PRIMARY_BUTTON_CLS,
//       theme: CORE_PRIMARY_COLOR_BUTTON_CLS,
//       destructive: DESTRUCTIVE_CLS,
//       trans: 'hover:bg-white/20 data-[selected=true]:bg-white/20',
//       //header: 'hover:bg-black/15 data-[selected=true]:bg-black/15',
//       secondary: SECONDARY_BUTTON_CLS,
//       ghost: BASE_GHOST_CLS,
//       muted: BASE_MUTED_CLS,
//       //'theme-muted': BASE_MUTED_THEME_CLS,
//       accent: BASE_ACCENT_CLS,
//       side: 'hover:bg-background',
//       menu: BASE_MENU_CLS,
//       link: LINK_CLS,
//       'red-link': RED_LINK_CLS,
//       footer: 'hover:bg-primary/20 data-[selected=true]:bg-primary/20',
//     },
//     font: {
//       none: '',
//       normal: 'font-normal',
//       medium: 'font-medium',
//       semibold: 'font-semibold',
//     },
//     rounded: {
//       none: '',
//       base: 'rounded-theme',
//       xs: 'rounded-xs',
//       sm: 'rounded-xs',
//       md: 'rounded-md',
//       lg: 'rounded-lg',
//       full: 'rounded-full ',
//     },
//     ring: {
//       'offset-1': 'ring-offset-1',
//       'offset-2': 'ring-offset-2',
//       inset: 'ring-inset',
//     },
//     items: {
//       center: 'items-center',
//       start: 'items-start',
//       end: 'items-end',
//     },
//     justify: {
//       center: 'justify-center',
//       start: 'justify-start',
//       end: 'justify-end',
//     },
//     size: {
//       base: BUTTON_H_CLS,
//       //narrow: cn(BUTTON_H_CLS, "w-5 justify-center"),
//       tab: 'px-2 h-7 justify-center',
//       sm: SM_BUTTON_H_CLS,
//       md: MD_BUTTON_H_CLS,
//       lg: LG_BUTTON_H_CLS,
//       xl: XL_BUTTON_H_CLS,
//       '2xl': XXL_BUTTON_H_CLS,
//       icon: cn(ICON_BUTTON_CLS, 'justify-center'),
//       'icon-lg': cn(
//         BASE_ICON_BUTTON_CLS,
//         CENTERED_ROW_CLS,
//         LARGE_ICON_BUTTON_CLS
//       ),
//       'icon-md': cn(BASE_ICON_BUTTON_CLS, CENTERED_ROW_CLS, MD_BUTTON_H_CLS),
//       'icon-sm': SM_ICON_BUTTON_CLS,
//       'icon-xs': XS_ICON_BUTTON_CLS,
//       dropdown: DROPDOWN_BUTTON_CLS,
//       'toolbar-dropdown': TOOLBAR_DROPDOWN_BUTTON_CLS,
//       header: 'w-11 h-11 aspect-square',
//       none: '',
//     },
//     pad: {
//       none: '',
//       lg: 'px-4',
//       base: 'px-3',
//       sm: 'px-2',
//       xs: 'px-1',
//     },
//     gap: {
//       none: '',
//       base: 'gap-x-2',
//       sm: 'gap-x-1',
//       xs: 'gap-x-0.5',
//     },
//     animation: {
//       default: TRANS_COLOR_CLS,
//       color: TRANS_COLOR_CLS,
//       none: '',
//     },
//   },
//   defaultVariants: {
//     variant: 'primary',
//     justify: 'center',
//     items: 'center',
//     gap: 'sm',
//     size: 'default',
//     font: 'none',
//     ring: 'offset-1',
//     rounded: 'default',
//     pad: 'default',
//     animation: 'default',
//   },
//   multiProps: {
//     icon: {
//       size: 'icon',
//       pad: 'none',
//     },
//     'icon-sm': {
//       size: 'icon-sm',
//       pad: 'none',
//     },
//     'icon-md': {
//       size: 'icon-md',
//       pad: 'none',
//     },
//     lg: {
//       size: 'lg',
//       pad: 'lg',
//       rounded: 'md',
//     },
//     toolbar: {
//       variant: 'accent',
//       rounded: 'md',
//       size: 'default',
//       pad: 'sm',
//     },
//     'toolbar-tab': {
//       variant: 'muted',
//       rounded: 'md',
//       size: 'sm',
//       pad: 'sm',
//     },
//     dropdown: {
//       variant: 'accent',
//       pad: 'none',
//       rounded: 'md',
//       size: 'dropdown',
//     },
//     'toolbar-dropdown': {
//       variant: 'accent',
//       pad: 'none',
//       rounded: 'md',
//       size: 'toolbar-dropdown',
//     },
//     link: {
//       variant: 'link',
//       pad: 'none',
//       size: 'none',
//       justify: 'start',
//     },
//     'red-link': {
//       variant: 'red-link',
//       pad: 'none',
//       size: 'none',
//       justify: 'start',
//     },
//   },
// })

export const buttonVariants = cva(BASE_BUTTON_CLS, {
  variants: {
    variant: {
      none: '',
      primary: CORE_PRIMARY_BUTTON_CLS,
      theme: CORE_PRIMARY_COLOR_BUTTON_CLS,
      destructive: DESTRUCTIVE_CLS,
      trans: 'hover:bg-white/20 data-[selected=true]:bg-white/20',
      secondary: BASE_SECONDARY_CLS,
      accent: ACCENT_BUTTON_CLS,
      ghost: BASE_GHOST_CLS,
      ios: BASE_IOS_CLS,
      outline: BASE_OUTLINE_CLS,
      muted: BASE_MUTED_CLS,
      'theme-muted': THEME_MUTED_CLS,
      //accent: BASE_ACCENT_CLS,
      side: 'hover:bg-background',
      menu: THEME_MENU_CLS,
      link: LINK_CLS,
      'red-link': RED_LINK_CLS,
      footer: 'hover:bg-primary/20 data-[selected=true]:bg-primary/20',
    },
    flow: {
      row: 'flex row',
      column: 'flex flex-col',
    },
    font: {
      none: '',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
    aspect: {
      auto: 'aspect-auto',
      icon: 'aspect-square',
    },
    rounded: {
      none: '',
      theme: 'rounded-theme',
      xs: 'rounded-xs',
      sm: 'rounded-xs',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full ',
    },
    ring: {
      'offset-1': 'ring-offset-1',
      'offset-2': 'ring-offset-2',
      inset: 'ring-inset',
    },
    items: {
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
    },
    justify: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
    },
    size: {
      default: cn(BUTTON_H_CLS, 'px-2'),
      //narrow: cn(BUTTON_H_CLS, "w-5 justify-center"),
      //tab: 'px-2 h-7 justify-center',
      sm: cn(SM_BUTTON_H_CLS, 'px-2'),
      //md: MD_BUTTON_H_CLS,
      lg: cn(LG_BUTTON_H_CLS, 'px-5'),
      xl: XL_BUTTON_H_CLS,
      '2xl': XXL_BUTTON_H_CLS,
      icon: cn(ICON_BUTTON_CLS, 'justify-center'),
      'icon-lg': cn(
        BASE_ICON_BUTTON_CLS,
        CENTERED_ROW_CLS,
        LARGE_ICON_BUTTON_CLS
      ),
      'icon-md': cn(BASE_ICON_BUTTON_CLS, CENTERED_ROW_CLS, MD_BUTTON_H_CLS),
      'icon-sm': SM_ICON_BUTTON_CLS,
      'icon-xs': XS_ICON_BUTTON_CLS,
      dropdown: DROPDOWN_BUTTON_CLS,
      'toolbar-dropdown': TOOLBAR_DROPDOWN_BUTTON_CLS,
      header: 'w-header h-header aspect-square',
      none: '',
    },
    // pad: {
    //   none: '',
    //   lg: 'px-4',
    //   xl: 'px-5',
    //   default: 'px-3',
    //   sm: 'px-2',
    //   xs: 'px-1',
    // },
    gap: {
      none: '',
      default: 'gap-2',
      sm: 'gap-1',
      xs: 'gap-0.5',
    },
    animation: {
      default: TRANS_COLOR_CLS,
      color: TRANS_COLOR_CLS,
      none: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    justify: 'center',
    items: 'center',
    flow: 'row',
    gap: 'sm',
    size: 'default',
    font: 'none',
    ring: 'offset-1',
    rounded: 'theme',
    //pad: 'default',
    animation: 'default',
  },
})

export type ButtonState = 'active' | 'inactive'

// export interface IButtonVariantProps {
//   variant?: string
//   size?: string
//   rounded?: string
//   ring?: string
//   font?: string
//   pad?: string
//   gap?: string
//   justify?: string
//   items?: string
//   animation?: string
//   multiProps?: string
// }

export interface IButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants>,
    //Component<typeof buttonVariants2>,
    //IButtonVariantProps,
    ITooltipSide {
  asChild?: boolean
  selected?: boolean
  state?: ButtonState
  ripple?: boolean
  tooltip?: string
}

export function Button({
  size,
  rounded,
  ring,
  font,
  //pad,
  gap,
  justify,
  flow,
  items,
  aspect,
  animation,
  variant = 'muted',
  selected = false,
  state = 'inactive',
  asChild = false,
  type = 'button',
  ripple = true,
  tooltip,
  tooltipSide = 'bottom',
  onMouseUp,
  onMouseDown,
  onMouseLeave,
  title,
  ref,
  className,
  children,
  ...props
}: IButtonProps) {
  const Comp = asChild ? Slot : 'button'

  //const [scope, animate] = useAnimate()

  // if we set a title and the aria label is not set,
  // use the title to reduce instances of aria-label
  // being empty

  if (!props['aria-label']) {
    props['aria-label'] = title
  }

  const rippleRef = useRef<HTMLSpanElement>(null)
  const [clickProps, setClickProps] = useState<IPos>({ x: -1, y: -1 })

  useEffect(() => {
    if (!ripple || clickProps.x === -1 || clickProps.y === -1) {
      return
    }

    if (clickProps.x !== -1) {
      gsap.fromTo(
        rippleRef.current,
        {
          transform: 'scale(1)',

          opacity: 0.9,
        },
        {
          transform: 'scale(12)',
          opacity: 0,
          duration: 2,
          ease: 'power3.out',
        }
      )
    } else {
      gsap.to(rippleRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }

    // Trigger an animation on click
    // animate(
    //   scope.current,
    //   {
    //     transform: ['scale(1)', 'scale(8)'], // Scale up then back down
    //     opacity: [0.9, 0], // Rotate 360 degrees
    //   },
    //   {
    //     duration: 1, // Animation duration (in seconds)
    //     ease: 'easeInOut', // Easing for a smooth effect
    //   }
    // )
  }, [clickProps])

  function _onMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
    setClickProps({ x: -1, y: -1 })

    onMouseUp?.(e)
  }

  function _onMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    //console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setClickProps({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })

    onMouseDown?.(e)
  }

  function _onMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    //setClickProps({ x: -1, y: -1 })
    onMouseLeave?.(e)
  }

  const comp = (
    <Comp
      data-slot="button"
      // className={buttonVariants({
      //   variant,
      //   size,
      //   rounded,
      //   ring,
      //   font,
      //   pad,
      //   gap,
      //   justify,
      //   items,
      //   animation,
      //   className: cn("relative", className),
      // })}
      className={buttonVariants({
        variant,
        size,
        rounded,
        ring,
        font,

        gap,
        flow,
        justify,
        aspect,
        items,
        animation,
        className: cn('relative text-nowrap', className),
      })}
      ref={ref}
      data-selected={selected}
      data-state={state}
      type={type}
      onMouseDown={_onMouseDown}
      onMouseUp={_onMouseUp}
      onMouseLeave={_onMouseLeave}
      title={title}
      {...props}
    >
      {children}
      <span
        ref={rippleRef}
        className={RIPPLE_CLS}
        style={{ left: clickProps.x, top: clickProps.y }}
      />
    </Comp>
  )

  if (tooltip) {
    return (
      <SimpleTooltip side={tooltipSide} content={tooltip}>
        {comp}
      </SimpleTooltip>
    )
  } else {
    return comp
  }
}
