import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBoardDetailsAPI } from '~/apis'
import Navbar from '~/components/Navbar'
import Board from '~/features/boards/Board'
import { setBoard } from '~/features/boards/boardSlice'
const AppLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const id = '663259ed926d9659c794fdb1'
    fetchBoardDetailsAPI(id).then((b) => dispatch(setBoard(b)))
  }, [dispatch])
  return (
    <div
      className="w-screen h-screen"
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
