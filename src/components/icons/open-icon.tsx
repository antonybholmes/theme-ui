import { ICON_CLS, type IIconProps } from '@interfaces/icon-props'
import { cn } from '@lib/class-names'
import { FolderOpen } from 'lucide-react'

export function OpenIcon({
  w = 'h-5 w-5',
  stroke = 'stroke-foreground',
  fill,
  className,
  strokeWidth = 1.5,
  iconMode,
}: IIconProps) {
  if (iconMode === 'colorful') {
    stroke = 'stroke-red-500'
    fill = 'fill-amber-200/75'
    strokeWidth = 1
  }

  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 576 512"
    //   className={cn(ICON_CLS, fill, w, className)}
    // >
    //   <path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z" />
    // </svg>

    <FolderOpen
      className={cn(ICON_CLS, stroke, fill, w, className)}
      strokeWidth={strokeWidth}
    />
  )
}
