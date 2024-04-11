import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { mapOrderedArr } from '~/helpers'
import Column from './Column'
const ListColumn = () => {
  const { columns, columnOrderIds } = useSelector((state) => state.board)
  const [orderedColumns, setOrderedColumns] = useState(
    mapOrderedArr(columns, columnOrderIds, '_id')
  )

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(pointerSensor)

  useEffect(() => {
    setOrderedColumns(mapOrderedArr(columns, columnOrderIds, '_id'))
  }, [columns, columnOrderIds])

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    setOrderedColumns((prevColumns) => {
      const oldIndex = prevColumns.findIndex((c) => c._id === active.id)
      const newIndex = prevColumns.findIndex((c) => c._id === over.id)

      return arrayMove(prevColumns, oldIndex, newIndex)
    })
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns.map((column) => column._id)}
        strategy={horizontalListSortingStrategy}
      >
        <ul className="flex gap-4">
          {orderedColumns.map((column) => (
            <Column key={column._id} column={column} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

export default ListColumn
