import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react'

const AlertDialog = ({
  open = true,
  onClose,
  onConfirm,
  dialogHeader,
  dialogBody,
  cancelButtonText,
  confirmButtonText
}) => {
  return (
    <Dialog open={open} handler={onConfirm}>
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
