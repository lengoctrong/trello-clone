import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBoardDetailsAPI } from '~/apis'
import Navbar from '~/components/Navbar'
import Board from '~/features/boards/Board'

const AppLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const boardId = '663259ed926d9659c794fdb1'
    fetchBoardDetailsAPI(boardId, dispatch)
  }, [dispatch])
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: 'url(./background.jpg)',
        backgroundSize: 'cover'
      }}
    >
      <Navbar />
      <Board />
    </div>
  )
}

export default AppLayout
