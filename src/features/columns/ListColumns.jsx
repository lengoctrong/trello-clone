import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import Column from './Column'
const ListColumn = ({ columns }) => {
  return (
    <SortableContext
      items={columns.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex gap-4">
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
      </div>
    </SortableContext>
  )
}

export default ListColumn
