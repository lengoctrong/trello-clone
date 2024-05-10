import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
  Typography
} from '@material-tailwind/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewActivityAPI, createNewColumnAPI } from '~/apis'
import { closeIcon } from '~/icons'

export function CopyColumnForm({ columnId, open, handleOpen, handleCancel }) {
  const {
    boardId,
    title: columnTitle,
    cards,
    cardOrderIds
  } = useSelector((state) => state.board.columns).find(
    (c) => c._id === columnId
  )
  const { name } = useSelector((state) => state.user)
  const [title, setTitle] = useState(columnTitle)

  const dispatch = useDispatch()

  const handleAddNewColumn = async () => {
    // call api
    const column = await createNewColumnAPI(
      { _id: columnId, boardId, title, cards, cardOrderIds },
      dispatch
    )
    createNewActivityAPI(
      {
        boardId: column.boardId,
        content: `${name} đã thêm danh sách ${column.title} vào bảng này`,
        createdAt: column.createdAt
      },
      dispatch
    )
    // close form
    setTitle(columnTitle)
    handleOpen(false)
  }

  return (
    <>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {' '}
            <Typography className="mb-1" variant="h4">
              Sao chép danh sách
            </Typography>
          </DialogHeader>
          <button className="mr-2" onClick={handleCancel}>
            {closeIcon}
          </button>
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Tên
            </Typography>

            <Textarea
              onFocus={(e) => e.target.select()}
              value={title}
              color="blue"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            disabled={!title}
            variant="gradient"
            color="blue"
            onClick={handleAddNewColumn}
          >
            Tạo danh sách
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
