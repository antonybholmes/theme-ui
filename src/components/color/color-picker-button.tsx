import { BaseCol } from '@/components/layout/base-col'
import { VCenterRow } from '@/components/layout/v-center-row'
import { Button, type IButtonProps } from '@/components/shadcn/ui/themed/button'
import { MenuSeparator } from '@/components/shadcn/ui/themed/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/ui/themed/popover'

import { cn } from '@lib/class-names'
import { hexToRgb } from '@lib/color'

import {
  FOCUS_INSET_RING_CLS,
  FOCUS_RING_CLS,
  INPUT_BORDER_CLS,
  XS_ICON_BUTTON_CLS,
} from '@/theme'

import { COLOR_BLACK, COLOR_TRANSPARENT } from '@/consts'
import { useState } from 'react'
import {
  HexAlphaColorPicker,
  HexColorInput,
  HexColorPicker,
} from 'react-colorful'
import { Input } from '../shadcn/ui/themed/input'

const COLOR_INPUT_CLS = cn(
  INPUT_BORDER_CLS,
  FOCUS_INSET_RING_CLS,
  //INPUT_CLS,
  'h-8 px-1 rounded-theme bg-background w-20'
)

// export const PRESET_COLORS = [
//   COLOR_WHITE,
//   '#ff0000',
//   '#3cb371',
//   '#6495ed',
//   '#FFA500',
//   '#8a2be2',
//   '#0000ff',
//   '#FFD700',
//   //"#800080",
//   '#a9a9a9',
//   COLOR_BLACK,
// ]

export const PRESET_COLORS = [
  '#000000', // Black
  '#FFFFFF', // White
  '#808080', // Gray
  '#C0C0C0', // Silver
  '#FF0000', // Red
  '#800000', // Maroon
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#808000', // Olive
  '#00FF00', // Lime
  '#008000', // Green
  '#00FFFF', // Cyan / Aqua
  '#008080', // Teal
  '#0000FF', // Blue
  '#000080', // Navy
  '#FF00FF', // Magenta / Fuchsia
  '#800080', // Purple
  '#FFC0CB', // Pink
  '#D2691E', // Chocolate / Brown
  '#F5F5DC', // Beige
  '#A52A2A', // Brown
  '#87CEEB', // Sky Blue
  '#FFD700', // Gold
  '#4B0082', // Indigo
]

export function isLightColor(color: string): boolean {
  const rgb = hexToRgb(color)
  const s = rgb.r + rgb.g + rgb.b

  return s > 700
}

// export const SIMPLE_COLOR_EXT_CLS = cn(
//   FOCUS_RING_CLS,
//   ICON_BUTTON_CLS,
//   "rounded-full",
// )

export const BASE_SIMPLE_COLOR_EXT_CLS = cn(XS_ICON_BUTTON_CLS, FOCUS_RING_CLS)

export const SIMPLE_COLOR_EXT_CLS = cn(
  BASE_SIMPLE_COLOR_EXT_CLS,
  'rounded-full'
)

export interface IProps extends IButtonProps {
  color: string
  defaultColor?: string
  tooltip?: string
  autoBorder?: boolean
  defaultBorderColor?: string
  allowNoColor?: boolean
  allowAlpha?: boolean
  keepAlphaChannel?: boolean
  align?: 'start' | 'end'
  onColorChange: (color: string, alpha: number) => void
  onCancel?: () => void
  open?: boolean
  onOpenChanged?: (open: boolean) => void
}

export function ColorPickerButton({
  color,
  defaultColor,
  tooltip = 'Change color',
  onColorChange,
  autoBorder = true,
  allowNoColor = false,
  allowAlpha = false,
  // we default to removing the alpha channel from the hex color
  // itself and instead returning it via the alpha parameter. This
  // is because this control is typically used for setting colors
  // that will be used in SVG components and to play nicely, we use
  // colors without the alpha channel and instead use fillOpacity and
  // strokeOpacity to set the color opacity on the svg element.
  keepAlphaChannel = false,
  defaultBorderColor = 'border-transparent',
  align = 'start',
  open,
  onOpenChanged,
  className,
  children,
  ...props
}: IProps) {
  const [_open, setOpen] = useState(false)

  function _onColorChange(color: string) {
    const rgba = hexToRgb(color)

    onColorChange?.(keepAlphaChannel ? color : color.slice(0, 7), rgba.a)
  }

  function _openChanged(open: boolean) {
    setOpen(open)
    onOpenChanged?.(open)
  }

  const lightMode = isLightColor(color)

  const border =
    (autoBorder && lightMode) || color === COLOR_TRANSPARENT
      ? 'border-border'
      : defaultBorderColor

  const textColor = lightMode ? 'text-black' : 'text-white'

  const o = open ?? _open

  const button = (
    <PopoverTrigger
      className={cn(
        'relative overflow-hidden border',
        textColor,
        border,
        className
      )}
      aria-label={props['aria-label'] ?? tooltip}
      style={{ backgroundColor: color }}
      {...props}
    >
      {children}

      {color === COLOR_TRANSPARENT && (
        <span className="absolute left-0 w-full bg-red-400 h-px top-1/2 -translate-y-1/2 -rotate-45" />
      )}
    </PopoverTrigger>
  )

  // if (tooltip) {
  //   button = <Tooltip content={tooltip}>{button}</Tooltip>
  // }

  //console.log(color)

  return (
    <Popover open={o} onOpenChange={open => _openChanged(open)}>
      {/* <Tooltip content={tooltip}>
      <DropdownMenuTrigger
        className={cn(
          "relative aspect-square overflow-hidden",
          [autoBorder && s > 750, "border border-border"],
          className,
        )}
        aria-label={ariaLabel ?? tooltip}
        style={{ backgroundColor: color }}
      /></Tooltip> */}

      {button}

      <PopoverContent
        onEscapeKeyDown={() => setOpen(false)}
        onInteractOutside={() => setOpen(false)}
        align={align}
        className="text-xs flex flex-col gap-y-3 w-70"
        variant="content"
      >
        <BaseCol className="color-picker gap-y-3">
          {allowAlpha ? (
            <HexAlphaColorPicker
              color={color ?? COLOR_BLACK}
              onChange={_onColorChange}
            />
          ) : (
            <HexColorPicker
              color={color ?? COLOR_BLACK}
              onChange={_onColorChange}
            />
          )}

          <VCenterRow className="gap-x-4 justify-between">
            <VCenterRow className="gap-x-1">
              <span>Hex</span>
              <HexColorInput
                color={color.toUpperCase()}
                alpha={true}
                prefixed={true}
                onChange={_onColorChange}
                className={COLOR_INPUT_CLS}
              />
            </VCenterRow>

            <VCenterRow className="gap-x-1">
              <span>A</span>
              <Input value={hexToRgb(color).a.toFixed(2)} className="w-16" />
            </VCenterRow>
          </VCenterRow>
        </BaseCol>
        <VCenterRow className="gap-px flex-wrap">
          {PRESET_COLORS.map(presetColor => {
            const prgb = hexToRgb(presetColor)
            const ps = prgb.r + prgb.g + prgb.b

            return (
              <button
                key={presetColor}
                className={cn(
                  'w-5 aspect-square border hover:scale-125 focus-visible:scale-125 rounded-xs',
                  [
                    autoBorder && ps > 750,
                    'border-border',
                    'border-transparent hover:border-white',
                  ]
                )}
                style={{ background: presetColor }}
                onClick={() => _onColorChange(presetColor)}
                tabIndex={0}
              />
            )
          })}
        </VCenterRow>

        {(allowNoColor || defaultColor) && <MenuSeparator />}

        {allowNoColor && (
          <Button
            variant="muted"
            className="w-full"
            justify="start"
            rounded="md"
            onClick={() => _onColorChange(COLOR_TRANSPARENT)}
          >
            <span className="relative aspect-square w-5 border border-border bg-background rounded-xs">
              <span className="absolute left-0 w-full bg-red-400 h-px top-1/2 -translate-y-1/2 -rotate-45" />
            </span>

            <span>No color</span>
          </Button>
        )}

        {defaultColor && (
          <Button
            variant="muted"
            className="w-full"
            justify="start"
            rounded="md"
            onClick={() => _onColorChange(defaultColor)}
          >
            <span
              className="aspect-square w-5 border border-border rounded-xs"
              style={{ backgroundColor: defaultColor }}
            />
            <span>Reset color</span>
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
