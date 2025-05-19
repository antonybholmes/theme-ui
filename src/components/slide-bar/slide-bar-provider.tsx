import type { IDivProps } from '@interfaces/div-props'
import { createContext, useState, type ReactNode } from 'react'
import type { LeftRightPos } from '../side'

export interface ISlidebarContext {
  title?: string
  side?: LeftRightPos
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position?: number
  limits?: [number, number]
  hideLimit?: number
  mainContent?: ReactNode
  sideContent?: ReactNode
}

export const DEFAULT_SLIDEBAR_CONTEXT: ISlidebarContext = {
  position: 80,
  limits: [10, 90],
}

export const SlidebarContext = createContext<ISlidebarContext>(
  DEFAULT_SLIDEBAR_CONTEXT
)

interface IProps extends ISlidebarContext, IDivProps {}

export function SlidebarProvider({
  title = '',
  side = 'Left',
  open = undefined,
  onOpenChange = () => {},
  position = 80,
  limits = [5, 85],
  hideLimit = 1,
  mainContent,
  sideContent,
  children,
}: IProps) {
  const [_open, setOpen] = useState(false)

  function _onOpenChange(state: boolean) {
    setOpen(state)

    onOpenChange?.(state)
  }

  const o = open !== undefined ? open : _open

  return (
    <SlidebarContext.Provider
      value={{
        title,
        side,
        open: o,
        onOpenChange: _onOpenChange,
        position,
        limits,
        hideLimit,
        mainContent,
        sideContent,
      }}
    >
      {children}
    </SlidebarContext.Provider>
  )
}
