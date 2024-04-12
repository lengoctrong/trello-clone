import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useMemo, useState } from 'react'
import { moreIcon } from '~/icons'
import ListColumns from '../columns/ListColumns'

import { arrayMove } from '@dnd-kit/sortable'
import { useSelector } from 'react-redux'
import { mapOrderedArr } from '~/helpers'
const Board = () => {
  const { columns, columnOrderIds } = useSelector((state) => state.board)

  const [active, setActive] = useState(null)
  const [orderedColumns, setOrderedColumns] = useState(
    mapOrderedArr(columns, columnOrderIds, '_id')
  )

  const activeColumn = useMemo(
    () => columns.find((column) => column._id === active?._id),
    [active, columns]
  )

  useEffect(() => {
    setOrderedColumns(mapOrderedArr(columns, columnOrderIds, '_id'))
  }, [columns, columnOrderIds])

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(pointerSensor)

  const handleDragStart = ({ active }) => {
    console.log('[DRAG START]', '\nactive:', active)
    setActive(active)
  }

  const handleDragOver = ({ active, over }) => {
    console.log('[DRAG OVER]', '\nactive:', active, '\nover:', over)
  }

  const handleDragEnd = ({ active, over }) => {
    console.log('[DRAG END]', '\nactive:', active, '\nover:', over)

    setActive(null)

    if (!over || active.id === over.id) return

    setOrderedColumns((prevColumns) => {
      const oldIndex = prevColumns.findIndex((c) => c._id === active.id)
      const newIndex = prevColumns.findIndex((c) => c._id === over.id)

      return arrayMove(prevColumns, oldIndex, newIndex)
    })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActive(null)
      }}
    >
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

        <ListColumns columns={orderedColumns} />
      </div>
    </DndContext>
  )
}
export default Board
