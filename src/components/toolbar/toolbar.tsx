import { BaseRow } from '@/components/layout/base-row'

import { type IDivProps } from '@interfaces/div-props'
import { type IOpenChange } from '@interfaces/open-change'
import { cn } from '@lib/class-names'

import { useContext, useEffect, useState, type ReactNode } from 'react'
import { FileMenu } from './file-menu'

import { Tabs, TabsContent } from '@/components/shadcn/ui/themed/tabs'
import { NO_MODULE_INFO, type IModuleInfo } from '@interfaces/module-info'

import type { IChildrenProps } from '@interfaces/children-props'
import type { TabsProps } from '@radix-ui/react-tabs'

import { VCenterRow } from '@/components/layout/v-center-row'
import { Button } from '@/components/shadcn/ui/themed/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/themed/dropdown-menu'
import { ChevronRightIcon } from '@components/icons/chevron-right-icon'
import { SplitIcon } from '@components/icons/split-icon'

import { type IButtonProps } from '@/components/shadcn/ui/themed/button'

import { EllipsisIcon } from '../icons/ellipsis-icon'
import { SidebarCloseIcon } from '../icons/side-bar-close-icon'
import { SidebarOpenIcon } from '../icons/side-bar-open-icon'
import { TabIndicatorProvider } from '../tabs/tab-indicator-provider'
import {
  getTabFromValue,
  TabContext,
  TabProvider,
  type ITab,
  type ITabProvider,
} from '../tabs/tab-provider'
import { UnderlineTabs } from '../tabs/underline-tabs'
import { ToolbarIconButton } from './toolbar-icon-button'

export const TAB_LINE_CLS = 'stroke-theme'

export const LINE_CLS = 'stroke-theme'

export function ShowOptionsButton({ ref, ...props }: IButtonProps) {
  return (
    <Button
      ref={ref}
      variant="muted"
      rounded="md"
      size="icon-sm"
      ripple={false}
      aria-label="Show options"
      name="Show options"
      {...props}
    >
      <SplitIcon />
    </Button>
  )
}

export function ShowOptionsMenu({
  ref,
  show = false,
  onClick,
}: IDivProps & { show?: boolean }) {
  //const [menuOpen, setMenuOpen] = useState(false)

  return (
    <DropdownMenuItem ref={ref} onClick={onClick}>
      {show ? <SidebarCloseIcon stroke="" /> : <SidebarOpenIcon stroke="" />}
      <span>{show ? 'Hide' : 'Show'} sidebar</span>
    </DropdownMenuItem>
  )
}

// interface ITabLineProps extends IClassProps {
//   w?: number
//   lineClassName?: string
// }

// export const ToolbarTabLine = forwardRef(function ToolbarTabLine(
//   { w = 2, lineClassName, className }: ITabLineProps,
//   ref: ForwardedRef<SVGLineElement>
// ) {
//   const y = w / 2
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox={`0 0 100 ${w}`}
//       className={cn(
//         `absolute h-[${w}px] w-full bottom-0 left-0 z-10`,
//         className
//       )}
//       shapeRendering={w < 3 ? 'crispEdges' : 'auto'}
//       preserveAspectRatio="none"
//     >
//       <line
//         ref={ref}
//         x1={0}
//         y1={y}
//         x2={0}
//         y2={y}
//         strokeWidth={w}
//         strokeLinecap={w > 2 ? 'round' : 'square'}
//         className={lineClassName}
//       />
//     </svg>
//   )
// })

// export const VToolbarTabLine = forwardRef(function VToolbarTabLine(
//   { w = 3, lineClassName, className }: ITabLineProps,
//   ref: ForwardedRef<SVGLineElement>
// ) {
//   const x = w / 2
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox={`0 0 ${w} 100`}
//       className={cn(`absolute w-[${w}px] h-full top-0 left-0`, className)}
//       shapeRendering={w < 3 ? 'crispEdges' : 'auto'}
//       preserveAspectRatio="none"
//     >
//       <line
//         ref={ref}
//         x1={x}
//         y1={0}
//         x2={x}
//         y2={0}
//         strokeWidth={w}
//         strokeLinecap={w > 2 ? 'round' : 'square'}
//         className={lineClassName}
//       />
//     </svg>
//   )
// })

export interface ITabDimProps {
  w: number
  x: number
  //lineW?: number
}

interface IToolbarMenuProps extends IOpenChange, TabsProps {
  fileMenuTabs?: ITab[]
  info?: IModuleInfo
  leftShortcuts?: ReactNode
  rightShortcuts?: ReactNode
  //tabShortcutMenu?: ReactNode
}

export function ToolbarMenu({
  open = false,
  onOpenChange = () => {},

  fileMenuTabs = [],

  info = NO_MODULE_INFO,
  leftShortcuts,
  rightShortcuts,
  //tabShortcutMenu,

  className,
}: IToolbarMenuProps) {
  // useEffect(() => {
  //   const selectedTabIndex = selectedTab.index

  //   //const button = buttonsRef.current[selectedTabIndex]!
  //   //const tabElem = itemsRef.current[selectedTabIndex]!

  //   //const buttonRect = button.getBoundingClientRect()
  //   const containerRect = tabListRef.current!.getBoundingClientRect()
  //   //const tabRect = tabElem.getBoundingClientRect()

  //   const clientRect =
  //     scale > 1
  //       ? buttonsRef.current[selectedTabIndex]!.getBoundingClientRect()
  //       : itemsRef.current[selectedTabIndex]!.getBoundingClientRect()

  //   setTabPos({
  //     x: clientRect.left - containerRect.left,
  //     width: clientRect.width,

  //   })
  // }, [selectedTab, scale])

  //const [scale, setScale] = useState(]

  const { selectedTab, tabs } = useContext(TabContext)!

  const selectedTabId = selectedTab?.tab.id ?? '' //getTabId(selectedTab.tab)

  return (
    <VCenterRow
      className={cn('shrink-0 text-xs grow px-2 gap-x-1 h-9', className)}
    >
      {leftShortcuts && (
        <VCenterRow id="toolbar-left-shortcuts h-8">{leftShortcuts}</VCenterRow>
      )}

      <VCenterRow className="shrink-0 grow h-8" id="file-toolbar-menu">
        <FileMenu
          open={open}
          onOpenChange={onOpenChange}
          tabs={fileMenuTabs}
          info={info}
        />
        <TabIndicatorProvider>
          <UnderlineTabs tabs={tabs} value={selectedTabId} />
        </TabIndicatorProvider>
        {/* <BaseTabsList
          id="toolbar-menu"
          className="relative flex flex-row items-center h-full"
          ref={tabListRef}
 
        >
          {tabs.map((tab, ti) => {
            //const id = makeTabId(tab, ti)
            const tabId = tab.id //getTabId(tab)
            const selected = tabId === selectedTabId
            return (
              <BaseTabsTrigger value={tabId} key={`tab-button-${ti}`} asChild>
                <ToolbarTabButton
                 
                  className="justify-center"
   
                  aria-label={`Show ${tab.id} menu`}
                  
                  ref={el => (buttonsRef.current[ti] = el!)}
                  onMouseEnter={() => {
                    if (selected) {
                      setScale(2)
                    }
                  }}
                  onMouseLeave={() => {
                    if (selected) {
                      setScale(1)
                    }
                  }}
                  onMouseDown={() => {
                    setScale(2)
                  }}
                >
                  <span
                    data-selected={selected}
                    ref={el => (itemsRef.current[ti] = el!)}
                    aria-label={tab.id}
                    className="boldable-text-tab group-hover:font-semibold data-[selected=true]:font-semibold data-[selected=true]:text-theme"
                  >
                    {tab.id}
                  </span>
                </ToolbarTabButton>
              </BaseTabsTrigger>
            )
          })}

 
          <ToolbarTabLine tabPos={tabPos} />
        </BaseTabsList> */}
      </VCenterRow>

      {rightShortcuts && (
        <VCenterRow
          className="hidden sm:flex gap-y-0.5 h-8"
          id="toolbar-right-shortcuts"
        >
          {rightShortcuts}
        </VCenterRow>
      )}
    </VCenterRow>
  )
}

interface IToolbarPanelProps {
  tabShortcutMenu?: ReactNode
}

export function ToolbarPanel({ tabShortcutMenu }: IToolbarPanelProps) {
  // change default if it does match a tab id

  const { selectedTab, tabs } = useContext(TabContext)!

  const [showDropdown, setShowDropdown] = useState(false)

  // if (!selectedTab) {
  //   return null
  // }

  return (
    <BaseRow className="items-end gap-x-2 px-2">
      <VCenterRow className="text-xs bg-background border border-border/25 shadow-md rounded-xl px-2 py-1.25 grow gap-x-2 justify-between">
        {tabs.map(tab => (
          <TabsContent
            value={tab.id}
            key={tab.id}
            className="hidden data-[state=active]:flex flex-row items-stretch gap-x-1"
          >
            {tab.id === selectedTab?.tab.id && tab.content}
          </TabsContent>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarIconButton title="More Options">
              <EllipsisIcon />
            </ToolbarIconButton>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={settings.toolbars.groups.labels.show}
              onCheckedChange={v => {
                const newSettings = produce(settings, draft => {
                  draft.toolbars.groups.labels.show = v
                })

                updateSettings(newSettings)
              }}
            >
 
              Show Labels
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </VCenterRow>
      {tabShortcutMenu && (
        <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="muted"
              size="icon-xs"
              ripple={false}
              title="Show side pane"
              selected={showDropdown}
            >
              <ChevronRightIcon className="rotate-90" w="w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {tabShortcutMenu}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </BaseRow>
  )
}

// interface IToolbarContentProps extends IChildrenProps {
//   gap?:string
// }

// export function ToolbarContent({
//   gap = "gap-y-1",
//   className,
//   children,
// }: IToolbarContentProps) {
//   return <BaseCol className={cn("shrink-0", gap, className)}>{children}</BaseCol>
// }

export interface IToolbarProps extends ITabProvider, IChildrenProps {}

export function Toolbar({
  value,
  onTabChange = () => {},
  tabs,
  children,
}: IToolbarProps) {
  const [selectedTab, setSelectedTab] = useState<ITab | null>(null)
  //const [focus, setFocus] = useState(false)
  //const [hover, setHover] = useState(false)
  //const initial = useRef(true)

  //const lineRef1 = useRef<SVGLineElement>(null)

  // const buttonsRef = useRef<HTMLButtonElement[]>([])
  // const itemsRef = useRef<HTMLSpanElement[]>([])
  // const tabListRef = useRef<HTMLDivElement>(null)

  // const [tabPos, setTabPos] = useState<ITabPos>({
  //   x: 0,
  //   width: 0,
  //   //transform: `scaleX(1)`,
  // })

  useEffect(() => {
    const selectedTab = getTabFromValue(value, tabs)

    if (selectedTab) {
      setSelectedTab(selectedTab.tab)
    }
  }, [value, tabs])

  function _onValueChange(value: string) {
    const selectedTab = getTabFromValue(value, tabs)
    //const [name, index] = parseTabId(value)

    //onValueChange?.(name)
    if (selectedTab) {
      onTabChange?.(selectedTab)
      setSelectedTab(selectedTab.tab)
    }
  }

  const _value = selectedTab?.id ?? ''

  return (
    <TabProvider value={_value} onTabChange={onTabChange} tabs={tabs}>
      <Tabs
        id="toolbar-menu-container"
        value={_value}
        //defaultValue={_value === "" ? `${tabs[0].name}:0`:undefined}
        onValueChange={_onValueChange}
        className="mb-2"
        orientation="horizontal"
      >
        {children}
      </Tabs>
    </TabProvider>
  )
}
