import { type IIconProps } from '@interfaces/icon-props'
import { cn } from '@lib/class-names'
import { FileImage } from 'lucide-react'

export function FileImageIcon({
  w = 'w-5 h-5',
  stroke = 'stroke-foreground',
  fill,
  className,
  strokeWidth = 1.5,
  iconMode = 'colorful',
}: IIconProps) {
  if (iconMode === 'colorful') {
    stroke = 'stroke-red-400'
    fill = 'fill-white'
  }

  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 384 512"
    //   className={cn(ICON_CLS, w, fill, className)}
    // >
    //   <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm96 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm69.2 46.9c-3-4.3-7.9-6.9-13.2-6.9s-10.2 2.6-13.2 6.9l-41.3 59.7-11.9-19.1c-2.9-4.7-8.1-7.5-13.6-7.5s-10.6 2.8-13.6 7.5l-40 64c-3.1 4.9-3.2 11.1-.4 16.2s8.2 8.2 14 8.2h48 32 40 72c6 0 11.4-3.3 14.2-8.6s2.4-11.6-1-16.5l-72-104z" />
    // </svg>

    <FileImage
      className={cn(stroke, fill, w, className)}
      stroke=""
      strokeWidth={strokeWidth}
    />
  )
}
