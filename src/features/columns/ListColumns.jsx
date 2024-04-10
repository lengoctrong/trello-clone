import { useSelector } from 'react-redux'
import Column from './Column'

import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
const ListColumn = () => {
  const columns = useSelector((state) => state.board.columns)
  const columnIds = columns.map((column) => column._id)
  return (
    <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
      <div className="flex gap-4">
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
      </div>
    </SortableContext>
  )
}

export default ListColumn
