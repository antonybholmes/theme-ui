import { VCenterRow } from '@/components/layout/v-center-row'
import { Tabs, TabsContent } from '@/components/shadcn/ui/themed/tabs'
import { ChevronRightIcon } from '@icons/chevron-right-icon'
import type { TabsProps } from '@radix-ui/react-tabs'
import { useMemo, type ReactNode } from 'react'
import { ToolbarIconButton } from './toolbar-icon-button'
import { ToolbarTabGroup } from './toolbar-tab-group'

import { type IFileDropProps } from '@/components/file-drop-panel'
import { DRAG_OUTLINE_CLS } from '@/theme'
import { cn } from '@lib/class-names'
import { FileDropZonePanel } from '../file-dropzone-panel'
import { HamburgerIcon } from '../icons/hamburger-icon'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../shadcn/ui/themed/dropdown-menu'
import { IconButton } from '../shadcn/ui/themed/icon-button'
import { ReorderTabs, type ITabReorder } from '../tabs/reorder-tabs'
import { TabIndicatorProvider } from '../tabs/tab-indicator-provider'
import {
  getTabFromValue,
  getTabName,
  type ITab,
  type ITabProvider,
} from '../tabs/tab-provider'
import { UnderlineTabs, type ITabMenu } from '../tabs/underline-tabs'

// const LINE_CLS =
//   "tab-line absolute bottom-0 left-0 block h-0.5 bg-theme"

interface IBottomBarProps
  extends TabsProps,
    ITabProvider,
    IFileDropProps,
    ITabMenu,
    ITabReorder {
  maxNameLength?: number
  padding?: number
  scale?: number
  buttonClassName?: string
  rightContent?: ReactNode
  allowReorder?: boolean
}

export function BottomBar({
  tabs,
  value,
  onValueChange,
  onTabChange,
  maxNameLength = 10,
  rightContent,
  onFileDrop = undefined,
  allowReorder = false,
  className,
  style,
  onReorder = () => {},
  menuCallback = () => {},
  menuActions = [],
}: IBottomBarProps) {
  const selectedTab = useMemo(() => getTabFromValue(value, tabs), [value, tabs])

  if (!selectedTab) {
    return null
  }

  const selectedTabId = selectedTab.tab.id //getTabId(selectedTab.tab)

  //const _tabValue = getTabValue(value ?? _value, tabs)

  function _onValueChange(value: string) {
    //const [name, index] = parseTabId(value)
    const selectedTab = getTabFromValue(value, tabs)

    console.log('Bottom', selectedTab)

    if (selectedTab?.tab.id) {
      onValueChange?.(selectedTab?.tab.id)
    }

    if (selectedTab) {
      onTabChange?.(selectedTab)
    }
    //onTabIdChange?.(value)
  }

  // className="hidden data-[state=active]:flex flex-row items-center gap-x-1"

  let tabContents: ReactNode = (
    <>
      {tabs.map(tab => (
        <TabsContent
          value={tab.id}
          key={tab.id}
          className="hidden data-[state=active]:flex flex-col grow"
        >
          {tab.id === selectedTabId && tab.content}
        </TabsContent>
      ))}
    </>
  )

  // if (onFileDrop) {
  //   tabContents = (
  //     <FileDropZonePanel onFileDrop={onFileDrop}>
  //       {tabContents}
  //     </FileDropZonePanel>
  //   )
  // }

  let content: ReactNode = (
    <Tabs
      value={selectedTabId}
      onValueChange={_onValueChange}
      className={cn(
        'flex grow flex-col',
        [onFileDrop !== undefined, DRAG_OUTLINE_CLS],
        className
      )}
      style={style}
    >
      {tabContents}
      <VCenterRow className="shrink-0 justify-between text-xs">
        <VCenterRow className="gap-x-2">
          <ToolbarTabGroup>
            <ToolbarIconButton
              title="Previous sheet"
              variant="muted"
              size="icon-sm"
              //rounded="full"
              onClick={() => {
                const selectedTabIndex = tabs
                  .map((t, ti) => [t, ti] as [ITab, number])
                  .filter(t => t[0]!.id === selectedTab.tab.id)
                  .map(t => t[1]!)[0]!

                const i =
                  selectedTabIndex === 0
                    ? tabs.length - 1
                    : Math.max(
                        0,
                        Math.min(tabs.length - 1, selectedTabIndex - 1)
                      )

                _onValueChange(tabs[i]!.id)
              }}
            >
              <ChevronRightIcon w="w-4" className="-scale-x-100" />
            </ToolbarIconButton>
            <ToolbarIconButton
              title="Next sheet"
              variant="muted"
              size="icon-sm"
              //rounded="full"
              onClick={() => {
                // const i: number = Math.min(
                //   tabs.length - 1,
                //   tabs
                //     .map((t, ti) => [t, ti] as [ITab, number])
                //     .filter(t => t[0]!.name === selectedTab.tab.id)
                //     .map(t => t[1]!)[0]! + 1
                // )

                const selectedTabIndex = tabs
                  .map((t, ti) => [t, ti] as [ITab, number])
                  .filter(t => t[0]!.id === selectedTab.tab.id)
                  .map(t => t[1]!)[0]!

                const i = Math.max(
                  0,
                  Math.min(
                    tabs.length - 1,
                    (selectedTabIndex + 1) % tabs.length
                  )
                )

                _onValueChange(tabs[i]!.id)
              }}
            >
              <ChevronRightIcon w="w-4" />
            </ToolbarIconButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton size="icon-sm" title="Sheet list">
                  <HamburgerIcon />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {tabs.map(tab => (
                  <DropdownMenuCheckboxItem
                    id={tab.id}
                    key={tab.id}
                    checked={tab.id === selectedTabId}
                  >
                    {getTabName(tab)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ToolbarTabGroup>
          <TabIndicatorProvider>
            {allowReorder ? (
              <ReorderTabs
                value={selectedTabId}
                tabs={tabs}
                maxNameLength={maxNameLength}
                variant="sheet"
                menuCallback={menuCallback}
                menuActions={menuActions}
                onReorder={onReorder}
              />
            ) : (
              <UnderlineTabs
                value={selectedTabId}
                tabs={tabs}
                maxNameLength={maxNameLength}
                variant="sheet"
                //menuCallback={menuCallback}
                //menuActions={menuActions}
              />
            )}
          </TabIndicatorProvider>
        </VCenterRow>
        {rightContent}
      </VCenterRow>
    </Tabs>
  )

  if (onFileDrop) {
    content = (
      <FileDropZonePanel onFileDrop={onFileDrop}>{content}</FileDropZonePanel>
    )
  }

  return content
}
