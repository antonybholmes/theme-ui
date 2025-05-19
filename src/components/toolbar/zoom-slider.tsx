import { cn } from '@lib/class-names'

import { type IDivProps } from '@interfaces/div-props'
import { SelectTrigger } from '@radix-ui/react-select'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../shadcn/ui/themed/select'
// import { Slider } from "../toolbar/slider"
import { Slider } from '@/components/shadcn/ui/themed/slider'
import { useZoom } from '@/hooks/use-zoom'
import { range } from '@lib/math/range'
import { Minus, Plus } from 'lucide-react'
import { VCenterRow } from '../layout/v-center-row'
import { ToolbarFooterButton } from './toolbar-footer-button'

export const ZOOM_SCALES = [0.25, 0.5, 0.75, 1, 2, 4] //[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4]

function formatZoom(scale: number): string {
  return `${(scale * 100).toFixed(0)}%`
}

export function ZoomSlider({ className }: IDivProps) {
  const [open, setOpen] = useState(false)

  const { zoom, setZoom } = useZoom()

  function _setValue(value: number) {
    //const index = Math.floor(value)

    setZoom(value)

    setOpen(false)
  }

  return (
    <VCenterRow className={cn('gap-x-1.5', className)}>
      <ToolbarFooterButton
        title="Zoom out"
        onClick={() => _setValue(Math.max(ZOOM_SCALES[0]!, zoom - 0.25))}
        size="icon-sm"
        variant="theme-muted"
      >
        <Minus className="w-4 h-4" strokeWidth={1.5} />
      </ToolbarFooterButton>

      <Slider
        value={[
          Math.max(
            ZOOM_SCALES[0]!,
            Math.min(zoom, ZOOM_SCALES[ZOOM_SCALES.length - 1]!)
          ),
        ]} //[Math.max(0, Math.min(scaleIndex, ZOOM_SCALES.length))]}
        defaultValue={[1]}
        min={ZOOM_SCALES[0]!}
        max={ZOOM_SCALES[ZOOM_SCALES.length - 1]!}
        onValueChange={(values: number[]) => _setValue(values[0]!)}
        step={1}
        className="w-24"
      />

      <ToolbarFooterButton
        title="Zoom in"
        onClick={() =>
          _setValue(Math.min(ZOOM_SCALES[ZOOM_SCALES.length - 1]!, zoom + 0.25))
        }
        size="icon-sm"
        variant="theme-muted"
      >
        <Plus className="w-4 h-4" strokeWidth={1.5} />
      </ToolbarFooterButton>

      <Select
        open={open}
        onOpenChange={setOpen}
        value={zoom.toString()}
        onValueChange={value => _setValue(Number(value))}
      >
        <SelectTrigger asChild>
          <ToolbarFooterButton
            className={cn('w-12 justify-center')}
            selected={open}
            aria-label="Show zoom levels"
            variant="theme-muted"
          >
            {formatZoom(zoom)}
          </ToolbarFooterButton>
        </SelectTrigger>
        <SelectContent className="text-xs">
          <SelectGroup>
            {/* <SelectLabel>Zoom Level</SelectLabel> */}

            {range(ZOOM_SCALES.length)
              .toReversed()
              .map(i => (
                <SelectItem value={ZOOM_SCALES[i]!.toString()} key={i}>
                  {formatZoom(ZOOM_SCALES[i]!)}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* <BaseDropDown open={open} onOpenChange={setOpen}>
        <ToolbarFooterButton
          className={cn("w-12 justify-center focus-visible:bg-primary/20")}
          selected={open}
        >
          {formatZoom(scaleIndex)}
        </ToolbarFooterButton>
        <>
          {range(ZOOM_SCALES.length)
            .toReversed()
            .map(i => (
              <DropdownMenuItem onClick={() => _setValue(i)} key={i}>
                {i === scaleIndex && (
                  <CheckIcon className="stroke-foreground" />
                )}
                <span>{formatZoom(i)}</span>
              </DropdownMenuItem>
            ))}
        </>
      </BaseDropDown> */}
    </VCenterRow>
  )
}

//font-semibold bg-blue-600 hover:bg-blue-600 text-white shadow-md rounded px-5 py-3 trans"
