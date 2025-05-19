import { cn } from '@lib/class-names'
import { useContext, useEffect, useRef, type ComponentProps } from 'react'

import { type ITooltipSide } from '@interfaces/tooltip-side-props'

import {
  getTabName,
  TabContext,
  TabProvider,
} from '@/components/tabs/tab-provider'
import { where } from '@/lib/math/where'
import { BaseTabsList, BaseTabsTrigger, Tabs } from '../shadcn/ui/themed/tabs'
import {
  TabIndicatorContext,
  TabIndicatorProvider,
} from '../tabs/tab-indicator-provider'
import { TabIndicatorV } from '../tabs/tab-indicator-v'
import { type IToolbarProps } from './toolbar'

interface IShortcutProps extends IToolbarProps {
  defaultHeight?: number
  showIcons?: boolean
  showLabels?: boolean
}

export function SideTabs({
  value,
  onTabChange = () => {},
  tabs = [],
  defaultHeight = 1.8,
  showIcons = true,
  showLabels = true,
  className,
}: IShortcutProps) {
  return (
    <TabProvider value={value} onTabChange={onTabChange} tabs={tabs}>
      <TabIndicatorProvider size={defaultHeight} scale={0.7}>
        <SideTabsContent
          defaultHeight={defaultHeight}
          showIcons={showIcons}
          showLabels={showLabels}
          className={className}
        />
      </TabIndicatorProvider>
    </TabProvider>
  )
}

interface ISideTabProps extends ComponentProps<'ul'>, ITooltipSide {
  defaultHeight?: number
  showIcons?: boolean
  showLabels?: boolean
}

export function SideTabsContent({
  defaultHeight = 2,
  showIcons = true,
  showLabels = true,
  className,
}: ISideTabProps) {
  const { selectedTab, onTabChange, tabs } = useContext(TabContext)!
  const pressed = useRef(false)
  const tabListRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLButtonElement[]>([])
  // const h = `${defaultHeight}rem`

  // const [tabPos, setTabPos] = useState<{ y: string; height: string }>({
  //   y: '0rem',
  //   height: `${defaultHeight}rem`,
  // })

  const { size, setTabIndicatorPos } = useContext(TabIndicatorContext)

  // useEffect(() => {
  //   if (!selectedTab) {
  //     return
  //   }

  //   const x = sum(
  //     rangeMap(index => tabs[index]!.size ?? defaultHeight, selectedTab.index)
  //   )

  //   const height = tabs[selectedTab.index]!.size ?? defaultHeight

  //   setTabPos({ y: `${x + 0.2}rem`, height: `${height - 0.4}rem` })

  //   setTabIndicatorPos({
  //     x: (x + 0.2) * size - s * 0.5,
  //     size: s,
  //     //transform: `scaleX(${ 1})`, //`scaleX(${scale > 1 ? trueScale : 1})`,
  //   })
  // }, [selectedTab])

  function _scale(index: number, scale: number) {
    const containerRect = tabListRef.current!.getBoundingClientRect()

    const clientRect = buttonsRef.current[index]!.getBoundingClientRect()

    const h = clientRect.height
    const s = h * scale

    setTabIndicatorPos({
      x: clientRect.top + h / 2 - s * 0.5 - containerRect.top,
      size: s,
    })

    // const s = size * scale

    // setTabIndicatorPos({
    //   x: (index + 0.5) * size - s * 0.5,
    //   size: s,
    //   //transform: `scaleX(${ 1})`, //`scaleX(${scale > 1 ? trueScale : 1})`,
    // })
  }

  useEffect(() => {
    if (selectedTab) {
      _scale(selectedTab.index, pressed.current ? 0.5 : 0.7)
    }
  }, [selectedTab])

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
        className={cn('relative shrink-0 pl-3 pr-2', className)}
        ref={tabListRef}
      >
        {tabs.map((tab, ti) => {
          const name = getTabName(tab)
          const selected = ti === selectedTab?.index
          return (
            <BaseTabsTrigger
              key={ti}
              value={name}
              aria-label={name}
              data-selected={selected}
              ref={el => {
                buttonsRef.current[ti] = el!
              }}
              onMouseDown={() => {
                pressed.current = true
                onTabChange?.({ index: ti, tab })
              }}
              onMouseEnter={() => {
                if (selected) {
                  _scale(selectedTab.index, 0.5)
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
                  _scale(selectedTab.index, 0.7)
                }
              }}
              className="flex flex-row gap-x-1 items-center data-[selected=true]:font-semibold"
              style={{ height: `${defaultHeight}rem` }}
            >
              {showIcons && (
                <span
                  className="w-4.5 fill-foreground stroke-foreground data-[selected=true]:fill-theme data-[selected=true]:stroke-theme"
                  data-selected={ti === selectedTab?.index}
                >
                  {tab.icon && tab.icon}
                </span>
              )}
              {showLabels && name}
            </BaseTabsTrigger>
          )
        })}

        {/* <motion.span
        className="absolute left-0 w-0.75 z-0 bg-theme rounded-full"
        animate={{ ...tabPos }}
        transition={{ ease: 'easeInOut' }}
      /> */}

        <TabIndicatorV />
      </BaseTabsList>
    </Tabs>
  )
}
