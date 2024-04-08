import { useEffect, useState } from 'react'
import Column from '../Column'
import Header from './Header'

const Board = () => {
  const [columns, setColumns] = useState([])
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await fetch('http://localhost:3001/board')
        const data = await res.json()
        setColumns(data.columns)
      } catch (err) {
        throw new Error(err)
      }
    }
    fetchColumns()
  }, [])
  return (
    <div className="h-[calc(100%-48px)] px-8">
      <Header />
      <div className="flex gap-4">
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
      </div>
    </div>
  )
}
export default Board
