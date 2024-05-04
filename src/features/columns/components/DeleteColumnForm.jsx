import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react'

export function DeleteColumnForm({
  open,
  handleOpen,
  handleConfirm,
  handleCancel
}) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Xác nhận xóa</DialogHeader>
      <DialogBody>
        Hành động này sẽ làm xóa cột và tất cả các thẻ trong cột này. Bạn có
        chắc chắn muốn xóa không?
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={handleCancel} className="mr-1">
          <span>Hủy bỏ</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleConfirm}>
          <span>Đồng ý</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
