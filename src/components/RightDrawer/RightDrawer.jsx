import { Drawer, IconButton, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBoardDetailsAPI } from '~/apis'
import {
  archiveBoxIcon,
  bars3CenterLeftIcon,
  circleInfoIcon,
  closeIcon,
  copyIcon,
  eyeIcon,
  minusIcon,
  photoIcon,
  settingsIcon
} from '~/icons'
import { RIGHT_DRAWER_TYPES } from '~/utils/constants'
import AlertDialog from '../AlertDialog'
import { SubRightDrawer } from './SubRightDrawer/SubRightDrawer'
import { closeRightDrawer, openSubRightDrawer } from './rightDrawerSlice'

export function RightDrawer() {
  const { open } = useSelector((state) => state.rightDrawer)
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const [openDeleteForm, setOpenDeleteForm] = useState(false)

  const handleCloseRightDrawer = () => {
    dispatch(closeRightDrawer())
  }

  const handleOpenRightSubDrawer = (e) => {
    dispatch(openSubRightDrawer(e.target.dataset.type))
  }

  const handleSoftDeleteBoard = () => {
    // call api to soft delete board (set _destroy)
    updateBoardDetailsAPI(boardId, { _destroy: true }, dispatch)

    setOpenDeleteForm(false)
    handleCloseRightDrawer()
  }

  return (
    <>
      <Drawer
        overlay={false}
        size={350}
        placement="right"
        open={open}
        onClose={() => setOpenDeleteForm(false)}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="text-center w-full">
            <Typography variant="h5" color="blue-gray">
              Menu
            </Typography>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={handleCloseRightDrawer}
          >
            {closeIcon}
          </IconButton>
        </div>

        <div className="py-1 border-t-2">
          <button
            data-type={RIGHT_DRAWER_TYPES.INFO}
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {circleInfoIcon}
            Về bảng này
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.ACTIVITY}
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {bars3CenterLeftIcon}
            Hoạt động
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.ARCHIVE}
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {archiveBoxIcon}
            Mục đã lưu trữ
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.SETTINGS}
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {settingsIcon}
            Cài đặt
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.CHANGE_BG}
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {photoIcon}
            Thay đổi hình nền
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.TAGS}
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {archiveBoxIcon}
            Nhãn
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.FOLLOW}
            className="btn w-full text-start flex gap-2 my-2"
          >
            {eyeIcon}
            Theo dõi
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.COPY}
            className="btn w-full text-start flex gap-2 my-2"
          >
            {copyIcon}
            Sao chép bảng thông tin
          </button>
          <button
            data-type={RIGHT_DRAWER_TYPES.CLOSE}
            className="btn w-full text-start flex gap-2 my-2"
            onClick={() => setOpenDeleteForm(true)}
          >
            {minusIcon}
            Đóng bảng thông tin
          </button>
        </div>
      </Drawer>
      <SubRightDrawer />
      <AlertDialog
        size="xs"
        open={openDeleteForm}
        onClose={() => setOpenDeleteForm(false)}
        onConfirm={handleSoftDeleteBoard}
        dialogHeader="Đóng bảng?"
        dialogBody="Bạn có thể tìm và mở lại các bảng đã đóng trong không gian làm việc của bạn."
        confirmButtonText="Đóng"
        cancelButtonText="Hủy"
      />
    </>
  )
}
