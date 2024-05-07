import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis'
import Loader from '~/components/Loader'
import Navbar from '~/components/Navbar'
import { RightDrawer } from '~/components/RightDrawer/RightDrawer'
import Board from '~/features/boards/Board'

const AppLayout = () => {
  const {
    _destroy,
    isPending,
    title: boardTitle
  } = useSelector((state) => state.board)
  const dispatch = useDispatch()
  const { boardId } = useParams()

  useEffect(() => {
    fetchBoardDetailsAPI(boardId, dispatch)
  }, [boardId, dispatch])

  const handleRestoreBoard = () => {
    updateBoardDetailsAPI(boardId, { _destroy: false }, dispatch)
  }

  return isPending ? (
    <Loader />
  ) : (
    <div className="h-screen">
      <Navbar />
      {_destroy ? (
        <div className="h-[calc(100%-48px)] p-3 overflow-x-auto bg-[url(/background.jpg)] bg-cover bg-center flex justify-center items-center">
          <div className="bg-white min-w-[600px] min-h-[236px] flex flex-col gap-8 text-center p-8">
            <h1 className="text-2xl font-bold">
              {boardTitle} đã được đóng lại.
            </h1>
            <button
              className="bg-blue-700 w-fit h-fit mx-auto px-2 py-1 rounded-md text-white hover:bg-blue-800"
              onClick={handleRestoreBoard}
            >
              Mở lại bảng
            </button>
            <a className="text-blue-700 font-bold">Xóa bảng vĩnh viễn</a>
          </div>
        </div>
      ) : (
        <Board />
      )}
      <RightDrawer />
    </div>
  )
}

export default AppLayout
