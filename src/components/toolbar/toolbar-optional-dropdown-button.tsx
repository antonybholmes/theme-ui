import { useRef, useState, type ReactNode } from 'react'

import { VCenterRow } from '@/components/layout/v-center-row'
import { ChevronRightIcon } from '@icons/chevron-right-icon'
import { cn } from '@lib/class-names'

import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/shadcn/ui/themed/dropdown-menu'

import { ROUNDED_CLS, TRANS_COLOR_CLS } from '@/theme'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { BaseCol } from '../layout/base-col'
import type { IButtonProps } from '../shadcn/ui/themed/button'
import { DropDownButton } from '../shadcn/ui/themed/dropdown-button'
import { ToolbarButton } from './toolbar-button'

const CONTAINER_CLS = cn(
  TRANS_COLOR_CLS,
  ROUNDED_CLS,
  //BUTTON_H_CLS,
  'overflow-hidden'
  //[open, "border-border", "border-transparent hover:border-border"],
)

interface IProps extends IButtonProps {
  icon: ReactNode
  onMainClick: () => void
  menuClassName?: string
}

export function ToolbarOptionalDropdownButton({
  size = 'icon',
  icon,
  onMainClick,
  title,
  menuClassName,
  children,
  ...props
}: IProps) {
  const [open, setOpen] = useState(false)

  const anchorRef = useRef(null)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <VCenterRow className={CONTAINER_CLS} ref={anchorRef}>
        <BaseCol>
          <VCenterRow>
            <ToolbarButton
              size={size}
              onClick={() => onMainClick()}
              //rounded="none"
              selected={open}
              aria-label={props['aria-label']}
              className="rounded-r-none"
              title={title}
            >
              {icon}
            </ToolbarButton>

            <DropDownButton
              variant="muted"
              selected={open}
              ripple={false}
              className="rounded-l-none"
              aria-label="Show dropdown menu"
              onClick={() => setOpen(true)}
            >
              <ChevronRightIcon className="rotate-90" w="w-4" />
            </DropDownButton>
          </VCenterRow>
          <DropdownMenuTrigger className="invisible w-full h-0" />
        </BaseCol>
      </VCenterRow>

      <DropdownMenuContent
        onInteractOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
        align="start"
        //sideOffset={20}
        className={menuClassName}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
