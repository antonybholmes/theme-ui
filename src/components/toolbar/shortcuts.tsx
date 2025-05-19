import { type IDivProps } from '@interfaces/div-props'
import { cn } from '@lib/class-names'
import { useContext, useEffect, useRef } from 'react'

import { type ITooltipSide } from '@interfaces/tooltip-side-props'

import { TabContext, TabProvider } from '@/components/tabs/tab-provider'
import { where } from '@/lib/math/where'
import { FOCUS_INSET_RING_CLS } from '@/theme'
import { BaseTabsList, BaseTabsTrigger, Tabs } from '../shadcn/ui/themed/tabs'
import { SimpleTooltip } from '../shadcn/ui/themed/tooltip'
import {
  TabIndicatorContext,
  TabIndicatorProvider,
} from '../tabs/tab-indicator-provider'
import { TabIndicatorV } from '../tabs/tab-indicator-v'
import { type IToolbarProps } from './toolbar'

const BUTTON_CLS = cn(
  FOCUS_INSET_RING_CLS,
  'flex flex-row items-center justify-center data-[selected=true]:bg-muted',
  'data-[selected=false]:stroke-foreground data-[selected=true]:stroke-theme',
  'data-[selected=false]:hover:bg-background trans-color rounded-theme'
)

interface IShortcutProps extends IToolbarProps {
  defaultWidth?: number
  gap?: number
}

export function Shortcuts({
  value,
  onTabChange = () => {},
  tabs = [],
  defaultWidth = 2.5,
  gap = 0.25,
}: IShortcutProps) {
  return (
    <TabProvider value={value} onTabChange={onTabChange} tabs={tabs}>
      <TabIndicatorProvider size={defaultWidth} scale={0.4}>
        <ShortcutContent gap={gap} />
      </TabIndicatorProvider>
    </TabProvider>
  )
}

interface IShortcutsProps extends IDivProps, ITooltipSide {
  gap?: number
}

export function ShortcutContent({
  gap = 0.5,
  className,
  ...props
}: IShortcutsProps) {
  const { selectedTab, onTabChange, tabs } = useContext(TabContext)!

  const { size, setTabIndicatorPos } = useContext(TabIndicatorContext)
  const pressed = useRef(false)

  function _scale(index: number, scale: number) {
    const s = size * scale

    setTabIndicatorPos({
      x: index * gap + (index + 0.5) * size - s * 0.5,
      size: s,
      //transform: `scaleX(${ 1})`, //`scaleX(${scale > 1 ? trueScale : 1})`,
    })
  }

  useEffect(() => {
    if (selectedTab) {
      _scale(selectedTab.index, pressed.current ? 0.6 : 0.4)
    }
  }, [selectedTab])

  const w = `${size}rem`

  return (
    <Tabs
      orientation="vertical"
      value={selectedTab?.tab.id ?? ''}
      onValueChange={v => {
        const idx = where(tabs, t => t.id === v)
        if (idx.length > 0) {
          onTabChange?.({ index: idx[0]!, tab: tabs[idx[0]!]! })
        }
      }}
    >
      <BaseTabsList
        className={cn(
          'relative shrink-0 items-center my-2 w-header pl-0.5 ml-0.5',
          className
        )}
        style={{ rowGap: `${gap}rem` }}
        {...props}
      >
        {tabs.map((tab, ti) => {
          const selected = ti === selectedTab?.index
          return (
            <SimpleTooltip content={tab.id} key={ti} side="right">
              <BaseTabsTrigger
                key={ti}
                value={tab.id}
                aria-label={tab.id}
                data-selected={selected}
                // onClick={() => {
                //   onTabChange?.({ index: ti, tab })
                // }}
                onMouseDown={() => {
                  pressed.current = true
                }}
                onMouseEnter={() => {
                  if (selected) {
                    _scale(selectedTab.index, 0.6)
                  }
                }}
                // onMouseDown={() => {
                //   setScale(0.3)
                // }}

                onMouseUp={() => {
                  pressed.current = false
                }}
                onMouseLeave={() => {
                  if (selected) {
                    _scale(selectedTab.index, 0.4)
                  }
                }}
                style={{ width: w, height: w }}
                className={BUTTON_CLS}
              >
                {tab.icon}
              </BaseTabsTrigger>
            </SimpleTooltip>
          )
        })}

        <TabIndicatorV />
      </BaseTabsList>
    </Tabs>
  )
}
