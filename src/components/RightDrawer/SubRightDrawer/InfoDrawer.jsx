import { IconButton, Textarea, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBoardDetailsAPI } from '~/apis'
import Button from '~/components/Button'
import { chevronLeftIcon, closeIcon, descriptionIcon, userIcon } from '~/icons'

export function InfoDrawer({ onBack, onClose }) {
  const dispatch = useDispatch()
  const { description } = useSelector((state) => state.board)
  const [desc, setDesc] = useState(description ?? '')
  const [showDescForm, setShowDescForm] = useState(false)

  const { boardId } = useParams()

  const handleSaveDescForm = () => {
    setShowDescForm(false)
    // Call API to save description
    updateBoardDetailsAPI(boardId, { description: desc }, dispatch)
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <IconButton variant="text" color="blue-gray" onClick={onBack}>
          {chevronLeftIcon}
        </IconButton>
        <div className="text-center w-full">
          <Typography variant="h5" color="blue-gray">
            Về bảng này
          </Typography>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          {closeIcon}
        </IconButton>
      </div>

      <div className="py-2 border-t-2 flex flex-col gap-4">
        <div className="flex gap-2">
          {userIcon} <div>Quản trị viên của bảng</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <img
            className="inline-block h-10 w-10 rounded-full mx-auto"
            src="/trello.png"
            alt="Avatar"
          />
          <div className="col-span-2">
            <div className="mb-2">
              <p>Le Trong</p>
              <small>@letrong8</small>
            </div>
            <div className="text-[12px] hover:underline hover:text-blue-500">
              <a href="#">Sửa thông tin cá nhân</a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex gap-4 items-center">
            {descriptionIcon}
            Mô tả
          </div>
          <div></div>
          {!showDescForm && (
            <button
              className="btn p-1"
              onClick={() => setShowDescForm(!showDescForm)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>
        <Textarea
          color="blue"
          placeholder="Nhập mô tả..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onClick={() => setShowDescForm(true)}
        />
        {showDescForm && (
          <div className="flex gap-2 items-center">
            <Button
              primary
              className="w-fit h-fit"
              onClick={handleSaveDescForm}
            >
              Lưu
            </Button>
            <button
              className="btn w-fit h-fit py-1 px-3"
              onClick={() => setShowDescForm(false)}
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    </>
  )
}
