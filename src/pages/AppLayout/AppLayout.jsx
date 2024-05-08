import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {
  deleteBoardDetailsAPI,
  getBoardDetailsAPI,
  updateBoardDetailsAPI
} from '~/apis'
import Loader from '~/components/Loader'
import Navbar from '~/components/Navbar'
import { RightDrawer } from '~/components/RightDrawer/RightDrawer'
import Board from '~/features/boards/Board'
import BoardFormOptions from './BoardFormOptions'

const AppLayout = () => {
  const {
    _destroy,
    isPending,
    title: boardTitle
  } = useSelector((state) => state.board)
  const dispatch = useDispatch()
  const { boardId } = useParams()

  useEffect(() => {
    getBoardDetailsAPI(boardId, dispatch)
  }, [boardId, dispatch])

  const handleRestoreBoard = () => {
    updateBoardDetailsAPI(boardId, { _destroy: false }, dispatch)
  }

  const handleDeleteBoardPermanently = () => {
    deleteBoardDetailsAPI(boardId, dispatch)
  }

  return isPending ? (
    <Loader />
  ) : (
    <div className="h-screen">
      <Navbar />
      {_destroy ? (
        <BoardFormOptions
          title={boardTitle}
          onRestore={handleRestoreBoard}
          onDelete={handleDeleteBoardPermanently}
        />
      ) : (
        <Board />
      )}
      <RightDrawer />
    </div>
  )
}

export default AppLayout
