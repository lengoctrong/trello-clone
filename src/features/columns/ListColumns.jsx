import { useSelector } from 'react-redux'
import Column from './Column'

const ListColumn = () => {
  const columns = useSelector((state) => state.board.columns)
  return (
    <div className="flex gap-4">
      {columns.map((column) => (
        <Column key={column._id} column={column} />
      ))}
    </div>
  )
}

export default ListColumn
