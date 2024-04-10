import ListColumns from '../columns/ListColumns'
import Header from './Header'

const Board = () => {
  return (
    <div className="h-[calc(100%-48px)] px-8">
      <Header />
      <ListColumns />
    </div>
  )
}
export default Board
