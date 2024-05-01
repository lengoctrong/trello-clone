import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
import Navbar from '~/components/Navbar'
import Board from '~/features/boards/Board'
const AppLayout = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const id = '662fe23a6c92c95a4bd62125'
      const board = await fetchBoardDetailsAPI(id)
      setBoard(board)
    }
    fetchData()
  }, [])

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: 'url(./background.jpg)',
        backgroundSize: 'cover'
      }}
    >
      <Navbar />
      <Board board={board} />
    </div>
  )
}

export default AppLayout
