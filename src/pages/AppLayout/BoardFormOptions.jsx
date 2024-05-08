import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis'
import Loader from '~/components/Loader'
import { ROUTES } from '~/utils/constants'
const BoardFormOptions = () => {
  const { _id: boardId, title } = useSelector((state) => state.board)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)

  const handleRestoreBoard = () => {
    updateBoardDetailsAPI(boardId, { _destroy: false }, dispatch)
  }

  const handleDeleteBoardPermanently = async () => {
    setIsPending(true)
    setTimeout(async () => {
      await deleteBoardDetailsAPI(boardId, dispatch)
      setIsPending(false)
      navigate(ROUTES.HOME)
    }, 1000)
  }

  return (
    <div className="h-[calc(100%-48px)] p-3 overflow-x-auto bg-[url(/background.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="bg-white min-w-[600px] min-h-[236px] flex flex-col gap-8 text-center p-8 relative">
        <h1 className="text-2xl font-bold">{title} đã được đóng lại.</h1>
        {isPending ? (
          <Loader className="flex justify-center items-center gap-4" />
        ) : (
          <>
            <button
              className="bg-blue-700 w-fit h-fit mx-auto px-2 py-1 rounded-md text-white hover:bg-blue-800"
              onClick={handleRestoreBoard}
            >
              Mở lại bảng
            </button>
            <button
              className="text-blue-700 font-bold"
              onClick={handleDeleteBoardPermanently}
            >
              Xóa bảng vĩnh viễn
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default BoardFormOptions
