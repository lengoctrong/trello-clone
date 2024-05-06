import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { pencilIcon } from '~/icons'
import CardForm from './CardForm'

const CardItem = ({ card }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleEditCard = () => {
    setIsFormOpen(true)
  }
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })

  const CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  }
  const placeholderClass = card.fe_placeholderCard ? 'invisible' : ''

  return (
    <>
      <div
        ref={setNodeRef}
        style={CSSProperties}
        {...attributes}
        {...listeners}
        className={placeholderClass}
      >
        <div
          className={
            'bg-white shadow-sm border-2 w-full text-start rounded-xl py-1 px-3 my-2 hover:border-blue-500 flex justify-between'
          }
          onMouseEnter={() => setIsEdit(true)}
          onMouseLeave={() => setIsEdit(false)}
        >
          {card.title}
          {isEdit && (
            <button
              className="hover:bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
              onClick={handleEditCard}
            >
              <span>{pencilIcon}</span>
            </button>
          )}
        </div>
      </div>
      {isFormOpen && <CardForm setIsFormOpen={setIsFormOpen} />}
    </>
  )
}

export default CardItem
