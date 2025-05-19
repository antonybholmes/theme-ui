import { useClickListener } from '@/hooks/use-click-listener'
import { useKeyDownListener } from '@/hooks/use-keydown-listener'
import { cn } from '@/lib/class-names'
import { randId } from '@/lib/utils'
import {
  Children,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { BaseCol } from './layout/base-col'
import { VCenterRow } from './layout/v-center-row'
import { SearchBox, type ISearchBoxProps } from './search-box'
import { Label } from './shadcn/ui/themed/label'

export function Autocomplete({
  id,
  label,
  className,
  children,
  ...props
}: ISearchBoxProps) {
  const c = Children.toArray(children)

  //const [value, setValue] = useState('')
  const [_id] = useState(id ?? randId('autocomplete'))

  const [isOpen, setIsOpen] = useState(false)
  const [focus, setFocus] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(focus && c.length > 0)
  }, [c])

  useKeyDownListener((event: Event) => {
    const e = event as KeyboardEvent

    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  })

  // if we click outside search, close it
  useClickListener((event: Event) => {
    const e = event as MouseEvent

    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  })

  let ret: ReactNode = (
    <BaseCol
      id={_id}
      data-open={isOpen}
      className={cn('relative group', [label !== undefined, 'grow', className])}
      ref={ref}
      onFocus={() => {
        if (c.length > 0) {
          setIsOpen(true)
        }
        setFocus(true)
      }}
      onBlur={() => setFocus(false)}
    >
      <VCenterRow
        data-open={isOpen}
        className={`z-20 data-[open=true]:z-40 mx-3 h-9 border-b 
          data-[open=true]:border-border/50 
          data-[open=false]:border-transparent`}
      >
        <SearchBox
          //value={value}
          //onTextChange={handleSearch}
          //onTextChanged={handleSearch}
          //onSearch={handleSearch}
          variant="plain"
          h="dialog"
          className="grow"
          {...props}
        />
      </VCenterRow>

      {/* z order is adjusted so that when open, it will be on top of other autocomplete elements
      otherwise they can intefer with each other when the z indices are equal */}
      <BaseCol
        data-open={isOpen}
        data-focus={focus}
        className={`absolute  
          rounded-md border border-border/50 shadow-xs bg-background
          w-full min-h-9 data-[open=true]:pt-11 data-[open=true]:pb-3 
          z-10 data-[open=true]:z-30 top-0 
          overflow-hidden`}
      >
        <BaseCol
          data-open={isOpen}
          className={cn(
            'grow overflow-y-auto max-h-42 custom-scrollbar hidden data-[open=true]:flex'
          )}
        >
          <ul data-open={isOpen} className="flex flex-col">
            {c}
          </ul>
        </BaseCol>
      </BaseCol>
    </BaseCol>
  )

  if (label) {
    ret = (
      <BaseCol className={cn('gap-y-1', className)}>
        {label && (
          <Label
            className="text-sm font-bold text-foreground/80 px-0.5"
            htmlFor={_id}
          >
            {label}
          </Label>
        )}
        {ret}
      </BaseCol>
    )
  }

  return ret
}

export function AutocompleteLi({
  className,
  children,
  ...props
}: ComponentProps<'li'>) {
  const [focus, setFocus] = useState(false)

  return (
    <li
      data-focus={focus}
      className={`flex flex-row items-center hover:bg-muted/50 
        focus-visible:bg-muted/50 data-[focus=true]:bg-muted/50 
        outline-none h-8 flex flex-row items-center px-4 gap-x-2`}
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => setFocus(false)}
      {...props}
    >
      {children}
    </li>
  )
}
