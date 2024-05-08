import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react'

const AlertDialog = ({
  open = false,
  onClose,
  onConfirm,
  dialogHeader,
  dialogBody,
  cancelButtonText,
  confirmButtonText,
  ...dialogProps
}) => {
  return (
    <Dialog {...dialogProps} open={open} handler={onClose}>
      <DialogHeader>{dialogHeader}</DialogHeader>
      <DialogBody>{dialogBody}</DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-1">
          <span>{cancelButtonText}</span>
        </Button>
        <Button variant="gradient" color="red" onClick={onConfirm}>
          <span>{confirmButtonText}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default AlertDialog
