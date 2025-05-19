import { BaseCol } from '@/components/layout/base-col'
import { FOCUS_INSET_RING_CLS } from '@/theme'
import { cn } from '@lib/class-names'

import { randId } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { useState, type ComponentProps } from 'react'
import { Label } from './label'

export const TEXTAREA_GROUP_CLS = cn(
  FOCUS_INSET_RING_CLS,
  'relative rounded-theme data-[readonly=true]:bg-muted/40'
)

export const textareaVariants = cva(TEXTAREA_GROUP_CLS, {
  variants: {
    variant: {
      default:
        'bg-background border border-border rounded-theme hover:border-ring overflow-hidden',
      dialog:
        'bg-background border border-border rounded-theme hover:border-ring shadow-sm p-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const TEXT_CLS =
  'w-full h-full text-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-hidden ring-none read-only:opacity-50 p-2'

export interface ITextAreaProps
  extends ComponentProps<'textarea'>,
    VariantProps<typeof textareaVariants> {
  label?: string | undefined
  lines?: string[]
  onTextChange?: (v: string[]) => void
  onTextChanged?: (v: string[]) => void
}

function toLines(text: string): string[] {
  return text.split(/[\r\n]+/g)
}

export function Textarea({
  ref,
  id,
  className,
  value,
  lines,
  disabled,
  readOnly,
  label,
  variant,
  onChange,
  onTextChange,
  onTextChanged,
  ...props
}: ITextAreaProps) {
  //const [_value, setInputValue] = useState("")
  const [focus, setFocus] = useState(false)
  //function _onChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //  setInputValue(event.target.value)
  //}

  const [_id] = useState(id ?? randId('textarea'))

  return (
    <BaseCol className="gap-y-1 grow">
      {label && (
        <Label
          className="text-sm font-bold text-foreground/80 px-0.5"
          htmlFor={_id}
        >
          {label}
        </Label>
      )}
      <div
        className={textareaVariants({
          variant,
          className,
        })}
        data-enabled={!disabled}
        data-readonly={readOnly}
        data-focus={focus}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
      >
        <textarea
          id={_id}
          disabled={disabled}
          className={TEXT_CLS}
          ref={ref}
          value={lines ? lines.join('\n') : value}
          readOnly={readOnly}
          onChange={e => {
            onTextChange?.(toLines(e.currentTarget.value))
            onChange?.(e)
          }}
          onKeyDown={e => {
            //console.log(e)
            if (e.key === 'Enter') {
              onTextChanged?.(toLines(e.currentTarget.value))
            }
          }}
          {...props}
        />
      </div>
    </BaseCol>
  )
}
