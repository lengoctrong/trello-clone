import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteColumnDetailsAPI } from '~/apis'
import AlertDialog from '~/components/AlertDialog'

export function DeleteColumnForm({ columnId, open, onClose }) {
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
      onClose()
    }
  }

  return (
    <AlertDialog
      open={open}
      onClose={onClose}
      onConfirm={handleDeleteColumn}
      dialogHeader="Xác nhận xóa"
      dialogBody="Hành động này sẽ làm xóa cột và tất cả các thẻ trong cột này. Bạn có
    chắc chắn muốn xóa không?"
      cancelButtonText={'Hủy bỏ'}
      confirmButtonText={'Đồng ý'}
    />
  )
}