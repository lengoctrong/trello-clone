import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { fetchBoardDetailsAPI, getAllBoardAPI } from '~/apis'
import Loader from '~/components/Loader'
import Navbar from '~/components/Navbar'
import Board from '~/features/boards/Board'

const AppLayout = () => {
  const { isPending } = useSelector((state) => state.board)
  const dispatch = useDispatch()
  const { boardId } = useParams()

  useEffect(() => {
    fetchBoardDetailsAPI(boardId, dispatch)
  }, [boardId, dispatch])

  useEffect(() => {
    getAllBoardAPI(dispatch)
  }, [dispatch])

  return isPending ? (
    <Loader />
  ) : (
    <div className="h-screen">
      <Navbar />
      <Board />
    </div>
  )
}

export default AppLayout
