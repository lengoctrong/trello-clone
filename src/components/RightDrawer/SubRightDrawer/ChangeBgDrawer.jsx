import { IconButton, Typography } from '@material-tailwind/react'
import { chevronLeftIcon, closeIcon } from '~/icons'

export function ChangeBgDrawer({ onBack, onClose }) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <IconButton variant="text" color="blue-gray" onClick={onBack}>
          {chevronLeftIcon}
        </IconButton>
        <div className="text-center w-full">
          <Typography variant="h5" color="blue-gray">
            Thay đổi phông nền
          </Typography>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          {closeIcon}
        </IconButton>
      </div>

      <div className="py-1 border-t-2">
        <p>Content here!</p>
      </div>
    </>
  )
}
