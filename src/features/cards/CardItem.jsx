import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { pencilIcon } from '~/icons'

import CardActionForm from './CardActionForm'
import CardDetailForm from './CardDetailForm'

const CardItem = ({ card }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formType, setFormType] = useState(null)

  const handleEditCard = (e) => {
    if (e.target.closest('[data-type]')) {
      setIsFormOpen(true)
      setFormType(e.target.dataset.type)
    }
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
          data-type="detail"
          onClick={handleEditCard}
          onMouseEnter={() => setIsEdit(true)}
          onMouseLeave={() => setIsEdit(false)}
        >
          {card.title}
          {isEdit && (
            <button
              data-type="action"
              onClick={handleEditCard}
              className="hover:bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
            >
              <span>{pencilIcon}</span>
            </button>
          )}
        </div>
      </div>
      {isFormOpen &&
        (formType === 'detail' ? (
          <CardDetailForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <CardActionForm
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
          />
        ))}
    </>
  )
}

export default CardItem
