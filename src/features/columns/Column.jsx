import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Button from '~/components/Button'
import { closeIcon, plusIcon } from '~/icons'
import { addNewCard } from '../boards/boardSlice'
import ListCards from '../cards/ListCards'
const Column = ({ column }) => {
  const { _id: columnId, boardId, title, cardOrderIds, cards } = column
  const dispatch = useDispatch()

  const [columnTitle, setColumnTitle] = useState(title)
  const [isAddNewCard, setIsAddNewCard] = useState(false)
  const [cardTitle, setCardTitle] = useState('')

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: columnId, data: { ...column } })

  const CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  const handleAddNewCard = () => {
    if (cardTitle.trim().length === 0) return
    const card = {
      _id: `card-${uuidv4()}`,
      columnId: cards[0].columnId,
      boardId: cards[0].boardId,
      title: cardTitle,
      cover: ''
    }
    dispatch(addNewCard(card))
    setCardTitle('')
    setIsAddNewCard(false)
  }
  return (
    <div
      ref={setNodeRef}
      style={CSSProperties}
      {...attributes}
      {...listeners}
      className="bg-gray-100 max-w-[272px] max-h-[760px] rounded-xl p-4 h-full cursor-pointer"
    >
      <input
        className="bg-transparent font-medium text-gray-500 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
        value={columnTitle}
        onChange={(e) => setColumnTitle(e.target.value)}
      />
      <ListCards cards={cards} cardOrderIds={column.cardOrderIds} />

      {isAddNewCard ? (
        <>
          <textarea
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
            rows={2}
            className="w-full p-2 mt-2 bg-white rounded-md resize-none outline-blue-500"
            placeholder="Nhập tiêu đề cho thẻ này..."
          />
          <div className="flex items-center gap-1">
            <Button type="primary" onClick={handleAddNewCard}>
              Thêm thẻ
            </Button>
            <button
              className="hover:bg-slate-300 p-1"
              onClick={() => setIsAddNewCard(!isAddNewCard)}
            >
              {closeIcon}
            </button>
          </div>
        </>
      ) : (
        <Button type="outline" onClick={() => setIsAddNewCard(!isAddNewCard)}>
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
