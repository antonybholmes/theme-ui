import { CloseButton, DialogButtons } from '@components/dialog/ok-cancel-dialog'
import { Children, type ReactNode } from 'react'

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/themed/dialog'
import { TEXT_CANCEL } from '@/consts'
import { BaseCol } from '../layout/base-col'
import { VCenterRow } from '../layout/v-center-row'
import {
  BaseGlassSideDialog,
  type IBaseGlassDialogProps,
} from './base-glass-side-dialog'

interface IProps extends IBaseGlassDialogProps {
  headerChildren?: ReactNode
  leftFooterChildren?: ReactNode
}

export function GlassSideDialog({
  title = '',
  open = true,
  span = 1,
  cols = 4,
  description = '',
  buttons = [],
  buttonOrder = 'auto',
  overlayColor = 'trans',
  size,
  height,
  onResponse = () => {},
  onOpenChange = () => {},
  className,
  headerChildren,
  leftFooterChildren,
  children,
}: IProps) {
  const c = Children.toArray(children)

  return (
    <BaseGlassSideDialog
      title={title}
      open={open}
      onOpenChange={onOpenChange}
      className={className}
      description={description}
      span={span}
      cols={cols}
      size={size}
      height={height}
      overlayColor={overlayColor}
      onResponse={onResponse}
    >
      {c[0]!}

      <>
        <DialogHeader className="flex flex-row -mt-2 -mr-2 justify-between">
          <DialogTitle>{title}</DialogTitle>

          <VCenterRow className="gap-x-4">
            {headerChildren && headerChildren}
            <CloseButton onClick={() => onResponse?.(TEXT_CANCEL)} />
          </VCenterRow>
        </DialogHeader>

        <BaseCol className="grow mt-2">{c[1]!}</BaseCol>

        <DialogFooter className="justify-between gap-x-2">
          <VCenterRow className="grow">
            {leftFooterChildren && leftFooterChildren}
          </VCenterRow>

          <DialogButtons
            buttons={buttons}
            buttonOrder={buttonOrder}
            onResponse={onResponse}
          />
        </DialogFooter>
      </>
    </BaseGlassSideDialog>
  )
}
