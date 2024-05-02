import { Spinner } from '@material-tailwind/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardDetailsAPI } from '~/apis'
import Navbar from '~/components/Navbar'
import Board from '~/features/boards/Board'

const AppLayout = () => {
  const dispatch = useDispatch()
  const { isPending } = useSelector((state) => state.board)

  useEffect(() => {
    const boardId = '66339f177074991df3eceaa7'
    fetchBoardDetailsAPI(boardId, dispatch)
  }, [dispatch])

  if (isPending)
    return (
      <div className="flex items-center justify-center h-screen w-screen gap-4">
        <Spinner color="blue" className="h-12 w-12" />
        <p>Đang tải...</p>
      </div>
    )

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
