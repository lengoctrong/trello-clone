import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { getAllCardByBoardIdAPI, getBoardDetailsAPI } from '~/apis'
import Loader from '~/components/Loader'
import Navbar from '~/components/Navbar'
import { RightDrawer } from '~/components/RightDrawer/RightDrawer'
import Board from '~/features/boards/Board'
import BoardFormOptions from './BoardFormOptions'

const AppLayout = () => {
  const { _destroy, isPending } = useSelector((state) => state.board)
  const dispatch = useDispatch()
  const { boardId } = useParams()

  useEffect(() => {
    getBoardDetailsAPI(boardId, dispatch)
    getAllCardByBoardIdAPI(boardId, dispatch)
  }, [boardId, dispatch])

  return isPending ? (
    <Loader className="flex items-center justify-center h-screen w-screen gap-4" />
  ) : (
    <div className="h-screen">
      <Navbar />
      {_destroy ? <BoardFormOptions /> : <Board />}
      <RightDrawer />
    </div>
  )
}

export default AppLayout
