import { useState } from 'react'
import CardForm from '~/features/cards/CardDetailForm'
import { pencilIcon } from '~/icons'

const CardBase = ({ children }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const listeners = {
    onMouseEnter: () => setIsEdit(true),
    onMouseLeave: () => setIsEdit(false)
  }

  const handleEditCard = () => {
    setIsFormOpen(true)
  }

  return (
    <>
      <div
        {...listeners}
        className={
          'bg-white shadow-sm border-2 w-full text-start rounded-xl py-1 px-3 my-2 hover:border-blue-500 flex justify-between'
        }
      >
        {children}
        {isEdit && (
          <button
            className="hover:bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
            onClick={handleEditCard}
          >
            <span>{pencilIcon}</span>
          </button>
        )}
      </div>
      {isFormOpen && <CardForm setIsFormOpen={setIsFormOpen} />}
    </>
  )
}

export default CardBase
