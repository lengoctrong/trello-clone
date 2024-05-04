import { Drawer, IconButton, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { chevronLeftIcon, closeIcon } from '~/icons'
import { closeAllRightDrawer, closeSubRightDrawer } from '../rightDrawerSlice'

export function TagsDrawer() {
  const isShowSubDrawer = useSelector(
    (state) => state.rightDrawer.isShowSubDrawer
  )
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeAllRightDrawer())
  }

  const handleBack = () => {
    dispatch(closeSubRightDrawer())
  }

  return (
    <Drawer
      placement="right"
      open={isShowSubDrawer}
      onClose={handleClose}
      className="p-4"
    >
      <div className="mb-6 flex items-center justify-between">
        <IconButton variant="text" color="blue-gray" onClick={handleBack}>
          {chevronLeftIcon}
        </IconButton>
        <div className="text-center w-full">
          <Typography variant="h5" color="blue-gray">
            Nhãn
          </Typography>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={handleClose}>
          {closeIcon}
        </IconButton>
      </div>

      <div className="py-1 border-t-2">
        <p>Content here!</p>
      </div>
    </Drawer>
  )
}
