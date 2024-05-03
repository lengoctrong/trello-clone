import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography
} from '@material-tailwind/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewBoardAPI } from '~/apis'

export function BoardForm() {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const dispatch = useDispatch()

  const handleAddNewBoard = () => {
    createNewBoardAPI({ title }, dispatch)
    setTitle('')
    setOpen(false)
  }

  const handleOpen = () => setOpen(!open)

  return (
    <>
      <button
        onClick={handleOpen}
        className="h-[100px] w-[200px] flex justify-center items-center text-black text-2xl rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300"
      >
        <p>Tạo bảng mới</p>
      </button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {' '}
            <Typography className="mb-1" variant="h4">
              Tạo bảng
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
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
              Nhập thông tin bảng
            </Typography>
            <Input
              color="blue"
              label="Tiêu đề *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            disabled={!title}
            variant="gradient"
            color="blue"
            onClick={handleAddNewBoard}
          >
            Tạo mới
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
