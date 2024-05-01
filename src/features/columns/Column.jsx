import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewCardAPI } from '~/apis'
import Button from '~/components/Button'
import ColumnBase from '~/components/ColumnBase'
import FormAddNew from '~/components/FormAddNew'
import ListCards from '~/features/cards/ListCards'
import { plusIcon } from '~/icons'
import { mapOrderedArr } from '~/utils/formatters'

const Column = ({ column }) => {
  const { _id: columnId, title, cards, cardOrderIds } = column
  const [orderedCards, setOrderedCards] = useState(
    mapOrderedArr(cards, cardOrderIds, '_id')
  )
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

  const handleAddNewCard = (e) => {
    e.preventDefault()
    if (!cardTitle.trim().length) {
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

  const ColumnBaseProps = {
    title
  }

  return (
    <li
      ref={setNodeRef}
      style={CSSProperties}
      {...attributes}
      {...listeners}
      className="h-full"
    >
      <ColumnBase {...ColumnBaseProps}>
        <input
          className="bg-transparent font-medium text-gray-500 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
          value={columnTitle}
          size={columnTitle?.length}
          onChange={(e) => setColumnTitle(e.target.value)}
        />
        <ListCards cards={orderedCards} />

        {toggleAddCardForm ? (
          <FormAddNew
            textAreaRows={2}
            onSubmit={handleAddNewCard}
            textAreaTitle={cardTitle}
            btnAddTitle="Thêm thẻ"
            setTitle={setCardTitle}
            toggleAddForm={toggleAddCardForm}
            setToggleAddForm={setToggleAddCardForm}
            placeholder="Nhập tiêu đề cho thẻ này..."
          />
        ) : (
          <Button
            type="outline"
            className="w-full"
            onClick={() => setToggleAddCardForm(!toggleAddCardForm)}
          >
            <p className="flex gap-1 items-center">
              <span>{plusIcon}</span>
              Thêm thẻ
            </p>
          </Button>
        )}
      </ColumnBase>
    </li>
  )
}

export default Column
