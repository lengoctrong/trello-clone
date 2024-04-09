import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '~/components/Navbar'
import Board from '~/features/boards/Board'
import { setBoard } from '~/features/boards/boardSlice'
const AppLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch('http://localhost:3001/board')
        const data = await res.json()
        dispatch(setBoard(data))
      } catch (err) {
        throw new Error(err)
      }
    }
    fetchBoard()
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
