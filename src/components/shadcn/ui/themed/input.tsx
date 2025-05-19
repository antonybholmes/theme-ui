import { WarningIcon } from '@/components/icons/warning-icon'
import { BaseCol } from '@/components/layout/base-col'
import { VCenterRow } from '@/components/layout/v-center-row'
import { randId } from '@/lib/utils'
import { FOCUS_INSET_RING_CLS } from '@/theme'
import type { IDivProps } from '@interfaces/div-props'
import { cn } from '@lib/class-names'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Label } from './label'

export const PLACEHOLDER_CLS = cn(
  'min-w-0 flex flex-row gap-x-2 items-center grow',
  'disabled:cursor-not-allowed data-[readonly=true]:bg-muted/40 overflow-hidden'
)

export const inputVariants = cva(PLACEHOLDER_CLS, {
  variants: {
    variant: {
      default:
        'bg-background border border-border rounded-theme hover:border-ring px-2',
      dialog: cn(
        'bg-background border border-border rounded-theme hover:border-ring shadow-sm px-2.5',
        FOCUS_INSET_RING_CLS
      ),
      plain: '',
      trans: 'bg-white/20 hover:bg-white/30 text-white fill-white',
      header: `border border-transparent bg-muted/75 stroke-foreground rounded-theme px-2
        hover:bg-background hover:shadow-xs hover:border-border
        data-[focus=true]:bg-background data-[focus=true]:shadow-xs data-[focus=true]:border-border
        trans-color`,
      alt: 'bg-muted/50 hover:bg-muted/75 px-2 stroke-foreground rounded-theme border-2 border-transparent data-[focus=true]:border-ring',
    },
    h: {
      sm: 'h-7',
      default: 'h-8',
      dialog: 'h-9',
      lg: 'h-10',
      xl: 'h-12',
      '2xl': 'h-14',
      header: 'h-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    h: 'default',
  },
})

export const INPUT_CLS = cn(
  'disabled:cursor-not-allowed disabled:opacity-50 read-only:opacity-50 placeholder:opacity-60',
  'outline-hidden border-none ring-none min-w-0 grow'
)

export interface IPlaceholderProps extends IDivProps {
  id: string | undefined
  placeholder?: string | undefined
  focus?: boolean
  hover?: boolean
  value: string | number | readonly string[] | undefined
  disabled?: boolean
}

export interface IInputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {
  error?: boolean
  inputCls?: string
  inputStyle?: CSSProperties
  leftChildren?: ReactNode
  rightChildren?: ReactNode
  otherChildren?: ReactNode
  label?: string | undefined
  onTextChange?: (v: string) => void
  onTextChanged?: (v: string) => void
}

export function Input({
  ref,
  id,
  value,
  defaultValue,
  leftChildren,
  rightChildren,
  otherChildren,
  type, // = 'text',
  inputCls,
  inputStyle,
  placeholder,
  error = false,
  label,
  variant = 'default',
  h = 'default',
  disabled,
  readOnly,
  onChange,
  onTextChange,
  onTextChanged,
  style,
  className,
  ...props
}: IInputProps) {
  const [_id] = useState(id ?? randId('input'))

  const [_value, setValue] = useState('')

  const [focus, setFocus] = useState(false)

  const v = defaultValue ?? value ?? _value

  let ret: ReactNode = (
    <VCenterRow className={cn('gap-x-4', label === undefined && className)}>
      <VCenterRow
        className={inputVariants({
          variant,
          h,
        })}
        data-enabled={!disabled}
        data-readonly={readOnly}
        data-error={error}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        data-focus={focus}
        style={style}
        ref={ref}
      >
        {leftChildren && leftChildren}
        <input
          id={_id}
          value={v}
          //defaultValue={defaultValue}
          type={type}
          className={cn(INPUT_CLS, inputCls)}
          style={inputStyle}
          disabled={disabled}
          readOnly={readOnly}
          onChange={e => {
            setValue(e.currentTarget.value)
            onTextChange?.(e.currentTarget.value)
            onChange?.(e)
          }}
          onKeyDown={e => {
            //console.log(e)
            if (e.key === 'Enter') {
              onTextChanged?.(e.currentTarget.value)
            }
          }}
          {...props}
        />

        {rightChildren && rightChildren}
        {error && <WarningIcon stroke="stroke-destructive" w="w-4 h-4" />}
      </VCenterRow>
      {otherChildren && otherChildren}
    </VCenterRow>
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
