import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewCardAPI } from '~/apis'
import { MAX_HEIGHT_COLUMN, MAX_WIDTH_COLUMN } from '~/utils/constants'

import FormAddNew from '~/components/FormAddNew'
import CardList from '~/features/cards/CardList'

import { plusIcon } from '~/icons'
import { mapOrderedArr } from '~/utils/formatters'
import ColumnDropdownMenu from './ColumnDropdownMenu/ColumnDropdownMenu'

const Column = ({ column }) => {
  const { _id: columnId, title, cards, cardOrderIds } = column
  const [orderedCards, setOrderedCards] = useState(cards)
  const [columnTitle, setColumnTitle] = useState(title)
  const [cardTitle, setCardTitle] = useState('')
  const [toggleAddCardForm, setToggleAddCardForm] = useState(false)

  const { _id: boardId } = useSelector((state) => state.board)
  const dispatch = useDispatch()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: columnId, data: { ...column } })

  const CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined
  }

  useEffect(() => {
    setOrderedCards(mapOrderedArr(cards, cardOrderIds, '_id'))
  }, [cards, cardOrderIds])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddNewCard(e)
    }
  }

  const handleAddNewCard = (e) => {
    e.preventDefault()
    if (!cardTitle.trim()) {
      setToggleAddCardForm(false)
      return
    }
    // add new card
    const cardData = {
      title: cardTitle,
      boardId,
      columnId
    }
    createNewCardAPI(cardData, dispatch)
    // reset form
    setCardTitle('')
    setToggleAddCardForm(false)
  }

  const handleCardTitleChange = (e) => setCardTitle(e.target.value)

  const handleCloseAddCardForm = (e) => {
    e.preventDefault()
    setCardTitle('')
    setToggleAddCardForm(false)
  }

  const FormAddNewProps = {
    textAreaRows: 2,
    textAreaTitle: cardTitle,
    btnAddTitle: 'Thêm thẻ',
    placeholder: 'Nhập tiêu đề cho thẻ này...',
    onKeyDown: handleKeyDown,
    onChange: handleCardTitleChange,
    onSubmit: handleAddNewCard,
    onClose: handleCloseAddCardForm
  }

  return (
    <div
      ref={setNodeRef}
      style={CSSProperties}
      {...attributes}
      {...listeners}
      className="h-full"
    >
      <div
        className={`bg-gray-100 max-h-[${MAX_HEIGHT_COLUMN}] max-w-[${MAX_WIDTH_COLUMN}] w-[272px] rounded-xl p-4 h-full cursor-pointer`}
      >
        <div className="flex justify-around">
          <input
            className="bg-transparent font-bold text-gray-600 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
            data-no-dnd
            value={columnTitle}
            size={columnTitle?.length}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
          <ColumnDropdownMenu columnId={columnId} />
        </div>

        <CardList cards={orderedCards} />

        {toggleAddCardForm ? (
          <FormAddNew {...FormAddNewProps} />
        ) : (
          <div
            type="outline"
            className="w-full"
            onClick={() => setToggleAddCardForm(!toggleAddCardForm)}
          >
            <div className="bg-transparent items-center w-full text-start rounded-xl py-1 px-3 my-2 hover:bg-gray-300">
              <div className="flex gap-2 min-w-full">
                {plusIcon}
                <p>Thêm thẻ</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Column
