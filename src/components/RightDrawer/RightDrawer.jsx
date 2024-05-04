import { Drawer, IconButton, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
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
import { closeRightDrawer, openSubRightDrawer } from './rightDrawerSlice'
import { SubDrawer } from './subRightDrawer'
export function RightDrawer() {
  const open = useSelector((state) => state.rightDrawer.open)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeRightDrawer())
  }

  const handleOpenRightSubDrawer = () => {
    dispatch(openSubRightDrawer())
  }

  return (
    <>
      <Drawer
        placement="right"
        open={open}
        onClose={handleClose}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="text-center w-full">
            <Typography variant="h5" color="blue-gray">
              Menu
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" onClick={handleClose}>
            {closeIcon}
          </IconButton>
        </div>

        <div className="py-1 border-t-2">
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {circleInfoIcon}
            Về bảng này
          </button>
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {bars3CenterLeftIcon}
            Hoạt động
          </button>
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {archiveBoxIcon}
            Mục đã lưu trữ
          </button>
        </div>

        <div className="py-1 border-t-2">
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {settingsIcon}
            Cài đặt
          </button>
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {photoIcon}
            Thay đổi hình nền
          </button>
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {archiveBoxIcon}
            Mục đã lưu trữ
          </button>
        </div>

        <div className="py-1 border-t-2">
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {eyeIcon}
            Theo dõi
          </button>
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {copyIcon}
            Sao chép bảng thông tin
          </button>
          <button
            className="btn w-full text-start flex gap-2 my-2"
            onClick={handleOpenRightSubDrawer}
          >
            {minusIcon}
            Đóng bảng thông tin
          </button>
        </div>
      </Drawer>
      <SubDrawer />
    </>
  )
}
