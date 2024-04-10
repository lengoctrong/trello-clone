import { DndContext } from '@dnd-kit/core'
import { moreIcon } from '~/icons'
import ListColumns from '../columns/ListColumns'

const Board = () => {
  const handleDragEnd = (e) => {
    console.log(e)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-[calc(100%-48px)] px-8">
        <div className="flex justify-between py-3">
          <input
            className=" btn font-medium outline-blue-500"
            value={'Board Title'}
            size={6}
            onChange={() => {}}
          />
          <button className="btn items-center bg-white">{moreIcon}</button>
        </div>
        <ListColumns />
      </div>
    </DndContext>
  )
}
export default Board
