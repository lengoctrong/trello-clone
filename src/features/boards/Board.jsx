import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { moreIcon } from '~/icons'
import ListColumns from '../columns/ListColumns'

import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import CustomOverlay from '~/components/CustomOverlay'
import { mapOrderedArr } from '~/helpers'
import CardItem from '../cards/CardItem'
import Column from '../columns/Column'
import { setBoardTitle } from './boardSlice'

const ACTIVE_TYPE = {
  CARD: 'card',
  COLUMN: 'column'
}

const Board = () => {
  const {
    columns,
    columnOrderIds,
    title: boardTitle
  } = useSelector((state) => state.board)
  const dispatch = useDispatch()

  const [active, setActive] = useState(null)
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

  const findColumn = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id).includes(cardId)
    )
  }

  const handleDragStart = ({ active }) => {
    console.log('[DRAG START]', '\nactive:', active)
    setActive(active)
  }

  const handleDragOver = ({ active, over }) => {
    if (active.id.startsWith(ACTIVE_TYPE.COLUMN) || !active || !over) return

    const { id: activeCardId } = active
    const { id: overCardId } = over

    const activeColumn = findColumn(activeCardId)
    const overColumn = findColumn(overCardId)

    if (!activeColumn || !overColumn || activeColumn === overColumn) return

    console.log('[DRAG OVER]', '\nactive:', active, '\nover:', over)

    console.log('activeColumn:', activeColumn, '\noverColumn:', overColumn)

    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn.cards.findIndex(
        (card) => card._id === overCardId
      )

      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn.cards.length++

      const newColumns = cloneDeep(prevColumns)
      const newActiveColumn = newColumns.find((c) => c._id === activeColumn._id)
      const newOverColumn = newColumns.find((c) => c._id === overColumn._id)

      newActiveColumn.cards = newActiveColumn.cards.filter(
        (card) => card._id !== activeCardId
      )

      newActiveColumn.cardOrderIds = newActiveColumn.cards.map(
        (card) => card._id
      )

      newOverColumn.cards = newOverColumn.cards.filter(
        (card) => card._id !== activeCardId
      )

      newOverColumn.cards = newOverColumn.cards.toSpliced(newCardIndex, 0, {
        ...active.data.current,
        columnId: newOverColumn._id
      })

      newOverColumn.cardOrderIds = newOverColumn.cards.map((card) => card._id)

      console.log(
        'newActiveColumn:',
        newActiveColumn,
        '\nnewOverColumn:',
        newOverColumn
      )

      return newColumns
    })
  }

  const handleDragEnd = ({ active, over }) => {
    setActive(null)

    console.log('[DRAG END]', '\nactive:', active, '\nover:', over)
    if (!active || !over || active.id === over.id) return

    if (active.id.startsWith(ACTIVE_TYPE.CARD)) {
      const { id: activeCardId } = active
      const { id: overCardId } = over

      const activeColumn = findColumn(activeCardId)
      const overColumn = findColumn(overCardId)

      console.log('activeColumn:', activeColumn, '\noverColumn:', overColumn)

      if (!activeColumn || !overColumn) return

      if (activeCardId !== overCardId) {
        // drag card through the other column
      }
      // drag card into the same column
      const oldCardIndex = overColumn.cards.findIndex(
        (card) => card._id === activeCardId
      )
      const newCardIndex = overColumn.cards.findIndex(
        (card) => card._id === overCardId
      )

      const orderedCards = arrayMove(
        overColumn.cards,
        oldCardIndex,
        newCardIndex
      )

      setOrderedColumns((prevColumns) => {
        const newColumns = cloneDeep(prevColumns)

        const targetColumn = newColumns.find(
          (column) => column._id === overColumn._id
        )

        targetColumn.cards = orderedCards
        targetColumn.cardOrderIds = orderedCards.map((card) => card._id)

        return newColumns
      })
    }

    if (active.id.startsWith(ACTIVE_TYPE.COLUMN)) {
      // drag column into the same board
      const { id: activeColumnId } = active
      const { id: overColumnId } = over

      setOrderedColumns((prevColumns) => {
        const oldColumnIndex = prevColumns.findIndex(
          (c) => c._id === activeColumnId
        )
        const newColumnIndex = prevColumns.findIndex(
          (c) => c._id === overColumnId
        )

        const orderedColumns = arrayMove(
          prevColumns,
          oldColumnIndex,
          newColumnIndex
        )

        return orderedColumns
      })
      console.log(
        'activeColumnId:',
        activeColumnId,
        '\noverColumnId:',
        overColumnId
      )
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-[calc(100%-48px)] px-8">
        <div className="flex justify-between py-3">
          <input
            className=" btn font-medium outline-blue-500"
            value={boardTitle}
            size={boardTitle.length - 5}
            onChange={(e) => dispatch(setBoardTitle(e.target.value))}
          />
          <button className="btn items-center bg-white">{moreIcon}</button>
        </div>

        <ListColumns columns={orderedColumns} />
        {active?.id.startsWith(ACTIVE_TYPE.CARD) && (
          <CustomOverlay>
            <CardItem key={active.id} card={active.data.current} />
          </CustomOverlay>
        )}
        {active?.id.startsWith(ACTIVE_TYPE.COLUMN) && (
          <CustomOverlay>
            <Column key={active.id} column={active.data.current} />
          </CustomOverlay>
        )}
      </div>
    </DndContext>
  )
}
export default Board
