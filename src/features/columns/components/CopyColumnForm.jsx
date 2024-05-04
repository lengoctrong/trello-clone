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
import { useParams } from 'react-router-dom'
import { createNewColumnAPI } from '~/apis'

export function CopyColumnForm({ columnId, open, onOpen }) {
  const column = useSelector((state) => state.board.columns).find(
    (column) => column._id === columnId
  )
  const columnTitle = column?.title
  const [title, setTitle] = useState(columnTitle ?? '')
  const dispatch = useDispatch()
  const { boardId } = useParams()

  const handleAddNewColumn = async () => {
    await createNewColumnAPI({ boardId, title }, dispatch)
    onOpen(false)
  }

  return (
    <>
      <Dialog open={open} size="xs" handler={onOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {' '}
            <Typography className="mb-1" variant="h4">
              Sao chép danh sách
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={onOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Tên
            </Typography>

            <Textarea
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
