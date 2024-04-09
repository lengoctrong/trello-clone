import ListColumns from '../columns/ListColumns'
import Header from './Header'

import { useSelector } from 'react-redux'

const Board = () => {
  const columns = useSelector((state) => state.board.columns)
  return (
    <div className="h-[calc(100%-48px)] px-8">
      <Header />
      <ListColumns columns={columns} />
    </div>
  )
}
export default Board
