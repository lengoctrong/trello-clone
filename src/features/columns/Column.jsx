import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Button from '~/components/Button'
import { mapOrderedArr } from '~/helpers'
import { closeIcon, plusIcon } from '~/icons'
import { addNewCard } from '../boards/boardSlice'
import ListCards from '../cards/ListCards'

const MAX_WIDTH_COLUMN = '272px'
const MAX_HEIGHT_COLUMN = '760px'

const Column = ({ column }) => {
  const { _id: columnId, title, cards, cardOrderIds } = column
  const [orderedCards, setOrderedCards] = useState(
    mapOrderedArr(cards, cardOrderIds, '_id')
  )
  const [columnTitle, setColumnTitle] = useState(title)
  const [adding, setAdding] = useState(false)
  const [cardTitle, setCardTitle] = useState('')

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
    opacity: isDragging ? 0.4 : undefined,
    overflowY: 'auto'
  }

  useEffect(() => {
    setOrderedCards(mapOrderedArr(cards, cardOrderIds, '_id'))
  }, [cards, cardOrderIds])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!cardTitle.trim().length) return

    const newCard = {
      _id: `card-${uuidv4()}`,
      columnId: cards[0].columnId,
      boardId: cards[0].boardId,
      title: cardTitle,
      cover: ''
    }
    dispatch(addNewCard(newCard))
    setCardTitle('')
    setAdding(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={CSSProperties}
      {...attributes}
      {...listeners}
      className={`bg-gray-100  max-h-[${MAX_HEIGHT_COLUMN}] max-w-[${MAX_WIDTH_COLUMN}] w-[272px] rounded-xl p-4 h-full cursor-pointer`}
    >
      <input
        className="bg-transparent font-medium text-gray-500 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
        value={columnTitle}
        size={columnTitle.length}
        onChange={(e) => setColumnTitle(e.target.value)}
      />
      <ListCards cards={orderedCards} />

      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
            rows={2}
            className="w-full p-2 mt-2 bg-white rounded-md resize-none outline-blue-500"
            placeholder="Nhập tiêu đề cho thẻ này..."
          />
          <div className="flex items-center gap-1">
            <Button type="submit" primary>
              Thêm thẻ
            </Button>
            <button
              className="hover:bg-slate-300 p-1"
              onClick={() => setAdding(!adding)}
            >
              {closeIcon}
            </button>
          </div>
        </form>
      ) : (
        <Button type="outline" onClick={() => setAdding(!adding)}>
          <p className="flex gap-1 items-center">
            <span>{plusIcon}</span>
            Thêm thẻ
          </p>
        </Button>
      )}
    </div>
  )
}

export default Column
