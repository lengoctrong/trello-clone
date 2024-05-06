import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteColumnDetailsAPI } from '~/apis'

export function DeleteColumnForm({ columnId, open, handleOpen, handleCancel }) {
  const dispatch = useDispatch()

  const handleDeleteColumn = async () => {
    const optsToast = {
      position: 'bottom-left'
    }
    try {
      const res = await deleteColumnDetailsAPI(columnId, dispatch)

      toast.success(res.data.deleteResult ?? 'Xoá thành công', optsToast)
    } catch (err) {
      toast.error(err.message, optsToast)
    } finally {
      handleCancel()
    }
  }

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
        <Button variant="gradient" color="red" onClick={handleDeleteColumn}>
          <span>Đồng ý</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
