import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography
} from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { moveColumnAndUpdateCardsAPI } from '~/apis'
import SubMenuMoveColumnForm from '~/features/columns/components/MoveColumnForm/SubMenuMoveColumnForm'

export function MoveColumnForm({ columnId, open, handleOpen, handleCancel }) {
  const columns = useSelector((state) => state.board.columns)
  const column = columns.find((column) => column._id === columnId)
  const oldBoardId = column?.boardId
  const { currentBoard: newBoard } = useSelector((state) => state.board)
  const newBoardId = newBoard._id
  const dispatch = useDispatch()

  const handleMoveColumn = async () => {
    console.log(
      'columnId: ',
      columnId,
      'oldBoardId: ',
      oldBoardId,
      'newBoardId: ',
      newBoardId
    )
    await moveColumnAndUpdateCardsAPI(
      columnId,
      oldBoardId,
      newBoardId,
      dispatch
    )
    handleCancel()
  }

  return (
    <>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {' '}
            <Typography className="mb-1" variant="h4">
              Di chuyển danh sách
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleCancel}
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
              Bảng
            </Typography>
            <SubMenuMoveColumnForm />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="gradient" color="blue" onClick={handleMoveColumn}>
            Di chuyển
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
