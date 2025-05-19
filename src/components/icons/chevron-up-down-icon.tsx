import { ICON_CLS, type IIconProps } from '@interfaces/icon-props'
import { cn } from '@lib/class-names'
import { ChevronsUpDown } from 'lucide-react'

export function ChevronUpDownIcon({
  w = 'w-4 h-4',
  stroke = 'stroke-foreground',
  className,
  strokeWidth = 2,
}: IIconProps) {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   className={cn(ICON_CLS, fill, stroke, w, className)}
    //   style={{
    //     strokeLinecap: 'round',
    //     strokeLinejoin: 'round',

    //     strokeWidth: 2,
    //     ...style,
    //   }}
    //   {...props}
    // >
    //   <polyline points="8,4 16,12 8,20" />
    // </svg>

    <ChevronsUpDown
      className={cn(ICON_CLS, stroke, w, className)}
      strokeWidth={strokeWidth}
      stroke=""
    />
  )
}
