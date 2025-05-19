import { BaseCol } from '@/components/layout/base-col'

import { TriangleRightIcon } from '@/components/icons/triangle-right-icon'
import { cn } from '@lib/class-names'
import { useEffect, useState } from 'react'
import { Input, type IInputProps } from './input'

const BUTTON_CLS = `w-5 shrink-0 h-4 flex flex-row justify-center items-center 
  data-[enabled=true]:stroke-foreground data-[enabled=false]:stroke-foreground/50 
  data-[enabled=true]:fill-foreground data-[enabled=false]:fill-foreground/50 
  data-[enabled=true]:hover:fill-theme data-[enabled=true]:focus:fill-theme 
  data-[enabled=true]:hover:stroke-theme data-[enabled=true]:focus:stroke-theme
  outline-hidden trans-color`

const DELAY = 200

export interface INumericalInputProps extends IInputProps {
  limit?: [number, number]
  inc?: number
  dp?: number
  /**
   * Callback that is run as you type. The returned number is
   * the valid number you typed. If what you type is translates
   * to NaN, this is not called.
   * @param v
   * @returns
   */
  onNumChange?: (v: number) => void
  onNumChanged?: (v: number) => void
  w?: string
}

export function NumericalInput({
  value = 0,
  limit,
  inc = 1,
  dp = 0,
  placeholder,
  onNumChange,
  onNumChanged,
  disabled,
  w = 'w-16',
  className,
}: INumericalInputProps) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const [_value, setValue] = useState<number>(Number(value))

  function _onNumChange(v: number): number {
    if (limit?.length === 2) {
      v = Math.min(limit[1], Math.max(limit[0], v))
    }

    setValue(v)

    // also call more realtime update, just in case
    onNumChange?.(v)

    return v
  }

  function _onNumChanged(v: number): number {
    v = _onNumChange(v)

    // update
    onNumChanged?.(v)

    return v
  }

  useEffect(() => {
    // if you set a value, it supersedes the internal value
    setValue(Number(value))
  }, [value])

  return (
    <Input
      value={_value.toFixed(dp)}
      type="number"
      min={limit?.length === 2 ? limit[0] : undefined}
      max={limit?.length === 2 ? limit[1] : undefined}
      disabled={disabled}
      className={cn(w, className)}
      inputCls="text-right"
      step={inc}
      onKeyDown={e => {
        //console.log(e)
        if (e.key === 'Enter') {
          const v = Number(e.currentTarget.value)

          // only called when user presses enter,
          // this is for when you don't want to respond
          // on every change, (e.g. it taxes the ui to keep
          // redrawing quickly, so only respond once user
          // has made a final choice
          if (!Number.isNaN(v)) {
            _onNumChanged(v) //onNumChanged?.(Math.min(limit[1], Math.max(limit[0], v)))
          }
        } else {
          // respond to arrow keys when ctrl pressed
          if (e.ctrlKey) {
            switch (e.key) {
              case 'ArrowUp':
              case 'ArrowRight':
                _onNumChanged(_value + inc)
                break
              case 'ArrowDown':
              case 'ArrowLeft':
                _onNumChanged(_value - inc)
                break
              default:
                break
            }
          }
        }
      }}
      onChange={e => {
        const v = Number(e.target.value)

        // default to min if garbage input
        if (!Number.isNaN(v)) {
          _onNumChange(v)
        }
      }}
      placeholder={placeholder}
      rightChildren={
        <BaseCol className="shrink-0 -mr-2">
          <button
            disabled={disabled}
            data-enabled={!disabled}
            className={BUTTON_CLS}
            // onClick={() => {
            //   _onNumChanged(_value.current + inc)
            // }}
            onMouseDown={() => {
              _onNumChanged(_value + inc)

              if (intervalId) return // Prevent setting multiple intervals

              // Set interval with a short {delay (e.g., 300ms)
              const id = setInterval(() => {
                _onNumChanged(_value + inc)
              }, DELAY)
              setIntervalId(id)
            }}
            onMouseUp={() => {
              if (intervalId) {
                clearInterval(intervalId)
              }
              setIntervalId(null)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                _onNumChanged(_value + inc)
              }
            }}
          >
            <TriangleRightIcon
              className="-rotate-90 -mb-0.5"
              w="w-3"
              stroke=""
              fill=""
              //strokeWidth={3}
            />
          </button>
          <button
            disabled={disabled}
            data-enabled={!disabled}
            className={BUTTON_CLS}
            // onClick={() => {
            //   _onNumChanged(_numValue - inc)
            // }}

            // onClick={() => {
            //   _onNumChanged(_value.current - inc)
            // }}
            onMouseDown={() => {
              _onNumChanged(_value - inc)

              if (intervalId) return // Prevent setting multiple intervals

              // Set interval with a short delay (e.g., 300ms)
              const id = setInterval(() => _onNumChanged(_value - inc), DELAY)
              setIntervalId(id)
            }}
            onMouseUp={() => {
              if (intervalId) {
                clearInterval(intervalId)
              }
              setIntervalId(null)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                _onNumChanged(_value - inc)
              }
            }}
          >
            <TriangleRightIcon
              className="rotate-90 mb-0.5"
              w="w-3"
              stroke=""
              strokeWidth={0}
              fill=""
            />
          </button>
        </BaseCol>
      }
    />
  )
}
