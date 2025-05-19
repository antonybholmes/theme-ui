import {
  SaveAsDialog,
  type ISaveAsDialogProps,
  type ISaveAsFormat,
} from './save-as-dialog'

export const IMAGE_FILE_FORMATS: ISaveAsFormat[] = [
  { name: 'PNG', ext: 'png' },
  { name: 'SVG', ext: 'svg' },
]

export function SaveImageDialog({
  open = true,
  name = 'plot',
  onResponse = () => {},
}: ISaveAsDialogProps) {
  return (
    <SaveAsDialog
      open={open}
      title="Save Image As"
      name={name}
      onResponse={onResponse}
      formats={IMAGE_FILE_FORMATS}
    />
  )
}
