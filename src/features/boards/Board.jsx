/* eslint-disable no-console */
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep, debounce, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNewActivityAPI,
  getAllActivitiesAPI,
  moveCardToDifferentColumnAPI,
  moveCardToSameColumnAPI,
  updateBoardDetailsAPI
} from '~/apis'
import CustomOverlay from '~/components/CustomOverlay'
import { openRightDrawer } from '~/components/RightDrawer/rightDrawerSlice'
import { MouseSensor } from '~/customLib'
import { moreIcon } from '~/icons'
import { DOCUMENT_TITLE } from '~/utils/constants'
import { generatePlaceholderCard, mapOrderedArr } from '~/utils/formatters'
import CardItem from '../cards/CardItem'
import Column from '../columns/Column'
import ColumnList from '../columns/ColumnList'

const Board = () => {
  const {
    _id: boardId,
    columns,
    columnOrderIds,
    title: boardTitle
  } = useSelector((state) => state.board)
  const { name: userName } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(null)
  const [originalCol, setOriginalCol] = useState(null)
  const [orderedColumns, setOrderedColumns] = useState(columns)
  const [title, setTitle] = useState(boardTitle)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  useEffect(() => {
    getAllActivitiesAPI(dispatch)
  }, [dispatch])

  useEffect(() => {
    document.title = `${DOCUMENT_TITLE.BOARD} | ${DOCUMENT_TITLE.HOME}`
  }, [title])

  useEffect(() => {
    setOrderedColumns(mapOrderedArr(columns, columnOrderIds, '_id'))
  }, [columns, columnOrderIds])

  const handleOpenRightDrawer = () => {
    dispatch(openRightDrawer())
  }

  const handleChangeBoardTitle = async (e) => {
    setTitle(e.target.value)
    updateBoardDetailsAPI(boardId, { title: e.target.value }, dispatch)
  }

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
    activeCardId,
    trigger = ''
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
        newActiveColumn.cardOrderIds = [
          generatePlaceholderCard(newActiveColumn)._id
        ]
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

      newOverColumn.cardOrderIds = newOverColumn.cards.map((card) => card._id)

      console.log(
        'newActiveColumn:',
        newActiveColumn,
        '\nnewOverColumn:',
        newOverColumn,
        '\nnewColumns: ',
        newColumns
      )

      if (trigger === 'handleDragEnd') {
        // delete placeholder card if exists
        newOverColumn.cards = newOverColumn.cards.filter(
          (card) => !card.fe_placeholderCard
        )

        newOverColumn.cardOrderIds = newOverColumn.cards.filter(
          (card) => !card.fe_placeholderCard
        )

        newOverColumn.cardOrderIds = newOverColumn.cards.map((card) => card._id)
        // call api to update two columns when drag card to another column
        const currentCardId = activeCardId
        const prevColumnId = activeColumn._id
        const currentColumnId = overColumn._id
        const currentCardOrderIds = newColumns.find(
          (c) => c._id === currentColumnId
        ).cardOrderIds
        let prevCardOrderIds =
          newColumns.find((c) => c._id === prevColumnId)?.cardOrderIds || []

        prevCardOrderIds = prevCardOrderIds.filter(
          (cardId) => !cardId.includes('placeholder-card')
        )
        if (
          prevCardOrderIds.length === 1 &&
          prevCardOrderIds[0].includes('placeholder-card')
        ) {
          prevCardOrderIds = []
        }
        moveCardToDifferentColumnAPI(
          {
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            currentColumnId,
            currentCardOrderIds
          },
          dispatch
        )
      }

      return newColumns
    })
    createNewActivityAPI(
      {
        type: 'moveCard',
        targetId: activeCardId,
        boardId,
        createdAt: new Date().getTime(),
        content: `${userName} đã di chuyển thẻ này từ danh sách ${activeColumn.title} đến danh sách ${overColumn.title}`
      },
      dispatch
    )
  }

  const handleDragStart = ({ active }) => {
    console.log('[DRAG START]', '\nactive:', active)
    setActiveItem(active)

    // [DRAG CARD]
    if (active.data.current.columnId) {
      setOriginalCol(findColumn(active.id))
      console.log('originalCol:', originalCol)
    }
  }

  const handleDragOver = (dragEvent) => {
    const { active, over } = dragEvent

    // [DRAG CARD]
    if (!active.data.current.columnId || !active || !over) return

    const { id: activeCardId } = active
    const { id: overCardId } = over

    const activeColumn = findColumn(activeCardId)
    const overColumn = findColumn(overCardId)

    if (!activeColumn || !overColumn || activeColumn === overColumn) return
    console.log('[DRAG OVER]', '\nactive:', active, '\nover:', over)

    console.log('activeColumn:', activeColumn, '\noverColumn:', overColumn)

    // drag card to another column
    dragCardToAnotherColumn(
      overColumn,
      overCardId,
      dragEvent,
      activeColumn,
      activeCardId,
      'handleDragOver'
    )
  }

  const handleDragEnd = (dragEvent) => {
    const { over } = dragEvent
    let { active } = dragEvent

    active = { ...active, ...activeItem }

    if (!active || !over) return
    console.log('[DRAG END]', '\nactive:', active, '\nover:', over)

    // [DRAG CARD]
    if (active.data.current.columnId) {
      const { id: activeCardId } = active
      const { id: overCardId } = over

      const overColumn = findColumn(overCardId)

      if (!originalCol || !overColumn) return
      console.log('originalCol:', originalCol, '\noverColumn:', overColumn)
      // drag card to another column
      if (originalCol._id !== overColumn._id) {
        dragCardToAnotherColumn(
          overColumn,
          overCardId,
          dragEvent,
          originalCol,
          activeCardId,
          'handleDragEnd'
        )
        return
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
        if (!orderedCards) return prevColumns
        const newColumns = cloneDeep(prevColumns)

        const targetColumn = newColumns.find(
          (column) => column._id === overColumn._id
        )

        if (targetColumn.cards.map((c) => c._id.includes('placeholder-card'))) {
          targetColumn.cards = targetColumn.cards.filter(
            (c) => !c._id.includes('placeholder-card')
          )
          targetColumn.cardOrderIds = targetColumn.cardOrderIds.filter(
            (c) => !c.includes('placeholder-card')
          )
        }

        console.log(
          'targetColumn:',
          targetColumn,
          '\norderedCards:',
          orderedCards
        )

        // call api to update column
        moveCardToSameColumnAPI(
          targetColumn._id,
          {
            cards: orderedCards,
            cardOrderIds: orderedCards.map((c) => c._id)
          },
          dispatch
        )

        return newColumns
      })
    }

    // [DRAG COLUMN]
    if (!activeItem.data.current.columnId) {
      // drag column into the same board
      const { id: activeColumnId } = activeItem
      const { id: overColumnId } = over

      setOrderedColumns((prevColumns) => {
        if (!activeColumnId || !overColumnId) return prevColumns
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
        // call api to update board
        const orderedColumnOrderIds = orderedColumns.map((column) => column._id)
        updateBoardDetailsAPI(
          boardId,
          { columnOrderIds: orderedColumnOrderIds },
          dispatch
        )
        return orderedColumns
      })
    }

    // reset
    setActiveItem(null)
    setOriginalCol(null)
  }

  return (
    <div
      id={boardId}
      className="h-[calc(100%-48px)] p-3 overflow-x-auto bg-[url(/background.jpg)] bg-cover bg-center"
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex justify-between">
          <input
            value={title}
            onInput={handleChangeBoardTitle}
            onChange={debounce(handleChangeBoardTitle, 1000)}
            onFocus={(e) => e.target.select()}
            className="font-bold bg-transparent text-white focus:text-black hover:text-white rounded-md px-2 py-1"
          />
          <button
            className="btn items-center bg-transparent text-gray-200 hover:gray-50"
            onClick={handleOpenRightDrawer}
          >
            {moreIcon}
          </button>
        </div>

        <ColumnList columns={orderedColumns} />

        {activeItem && (
          <>
            {/* card overlay */}
            <CustomOverlay>
              {activeItem?.data.current.columnId && (
                <CardItem card={activeItem.data.current} />
              )}
            </CustomOverlay>
            {/* column overlay */}
            <CustomOverlay>
              {!activeItem?.data.current.columnId && (
                <Column column={activeItem.data.current} />
              )}
            </CustomOverlay>
          </>
        )}
      </DndContext>
    </div>
  )
}
export default Board
