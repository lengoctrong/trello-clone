import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { moreIcon } from '~/icons'
import ListColumns from '../columns/ListColumns'

import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep, isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import CardBase from '~/components/CardBase'
import ColumnBase from '~/components/ColumnBase'
import CustomOverlay from '~/components/CustomOverlay'
import { generatePlaceholderCard, mapOrderedArr } from '~/utils/formatters'
import CardItem from '../cards/CardItem'
import Column from '../columns/Column'

const ACTIVE_TYPE = {
  CARD: 'card',
  COLUMN: 'column'
}

const Board = () => {
  const {
    _id: boardId,
    columns,
    columnOrderIds,
    title: boardTitle
  } = useSelector((state) => state.board)

  const [activeItem, setActiveItem] = useState(null)
  const [originalCol, setOriginalCol] = useState(null)
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

  const dragCardToAnotherColumn = (
    overColumn,
    overCardId,
    dragEvent,
    activeColumn,
    activeCardId
  ) => {
    const { active, over } = dragEvent
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
      // check if the old column has only one card
      if (isEmpty(newActiveColumn.cards)) {
        newActiveColumn.cards = [generatePlaceholderCard(newActiveColumn)]
      }

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

      // delete placeholder card if exists
      newOverColumn.cards = newOverColumn.cards.filter(
        (card) => !card.fe_placeholderCard
      )

      newOverColumn.cardOrderIds = newOverColumn.cards.map((card) => card._id)

      console.log(
        'newActiveColumn:',
        newActiveColumn,
        '\nnewOverColumn:',
        newOverColumn
      )

      console.log('newColumns:', newColumns)

      return newColumns
    })
  }

  const handleDragStart = ({ active }) => {
    console.log('[DRAG START]', '\nactive:', active)
    setActiveItem(active)

    // Drag card
    if (active.data.current.columnId) {
      setOriginalCol(findColumn(active.id))
      console.log('originalCol:', originalCol)
    }
  }

  const handleDragOver = (dragEvent) => {
    const { active, over } = dragEvent
    if (active.id.startsWith(ACTIVE_TYPE.COLUMN) || !active || !over) return

    const { id: activeCardId } = active
    const { id: overCardId } = over

    const activeColumn = findColumn(activeCardId)
    const overColumn = findColumn(overCardId)

    if (!activeColumn || !overColumn || activeColumn === overColumn) return
    console.log('[DRAG OVER]', '\nactive:', active, '\nover:', over)

    console.log('Kéo thả card qua các column khác')

    console.log('activeColumn:', activeColumn, '\noverColumn:', overColumn)

    // drag card to another column
    dragCardToAnotherColumn(
      overColumn,
      overCardId,
      dragEvent,
      activeColumn,
      activeCardId
    )
  }

  const handleDragEnd = (dragEvent) => {
    const { over } = dragEvent

    if (!activeItem || !over) return
    console.log('[DRAG END]', '\nactive:', activeItem, '\nover:', over)

    if (activeItem.data.current.columnId) {
      const { id: activeCardId } = activeItem
      const { id: overCardId } = over

      const overColumn = findColumn(overCardId)

      console.log('originalCol:', originalCol, '\noverColumn:', overColumn)

      if (!originalCol || !overColumn) return

      if (originalCol._id !== overColumn._id) {
        // drag card to another column
        dragCardToAnotherColumn(
          overColumn,
          overCardId,
          dragEvent,
          originalCol,
          activeCardId
        )
      }

      // drag card within the same column
      const oldCardIndex = originalCol.cards.findIndex(
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

    if (!activeItem.data.current.columnId) {
      console.log('Kéo thả column')

      // drag column into the same board
      const { id: activeColumnId } = activeItem
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
    }

    // reset
    setActiveItem(null)
    setOriginalCol(null)
  }

  return (
    <div id={boardId} className="h-[calc(100%-48px)] p-3">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex justify-between">
          <input
            className=" btn font-medium outline-blue-500"
            value={boardTitle}
            size={boardTitle.length - 5}
            onChange={() => {}}
          />
          <button className="btn items-center bg-white">{moreIcon}</button>
        </div>

        <ListColumns columns={orderedColumns} />

        {activeItem && (
          <>
            {/* card overlay */}
            <CustomOverlay>
              {activeItem?.data.current.columnId && (
                <CardBase>{activeItem.data.current.title}</CardBase>
              )}
            </CustomOverlay>
            {/* column overlay */}
            <CustomOverlay>
              {!activeItem?.data.current.columnId && (
                <ColumnBase overlay data={activeItem.data.current}></ColumnBase>
              )}
            </CustomOverlay>
          </>
        )}
      </DndContext>
    </div>
  )
}
export default Board
