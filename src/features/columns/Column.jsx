import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Card from '~/features/cards/Card'
import { closeIcon, plusIcon } from '~/icons'
import Button from '../../components/Button'
import { addNewCard } from '../boards/boardSlice'
import ListCards from '../cards/ListCards'
const Column = ({ column }) => {
  const [cardTitle, setCardTitle] = useState('')
  const [isAddNewCard, setIsAddNewCard] = useState(false)
  const { _id: columnId, boardId, title, cardOrderIds, cards } = column
  const dispatch = useDispatch()
  const handleAddNewCard = () => {
    if (cardTitle.trim().length === 0) return
    const card = {
      _id: `card-${uuidv4()}`,
      columnId,
      boardId,
      title: cardTitle,
      cover: ''
    }
    dispatch(addNewCard(card))
    setCardTitle('')
    setIsAddNewCard(false)
  }
  return (
    <div className="bg-gray-100 max-w-[272px] max-h-[760px] rounded-xl p-4">
      <input
        className="bg-transparent font-medium text-gray-500 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
        value={title}
        onChange={() => {}}
      />
      <ListCards cards={cards} />
      {isAddNewCard ? (
        <>
          <Card
            type="textArea"
            title={cardTitle}
            onChangeTitle={setCardTitle}
          />
          <div className="flex items-center gap-1">
            <Button type="primary" onClick={handleAddNewCard}>
              Thêm thẻ
            </Button>
            <button
              onClick={() => setIsAddNewCard(!isAddNewCard)}
              className="btn-close"
            >
              {closeIcon}
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsAddNewCard(!isAddNewCard)}
          className="btn flex items-center gap-1 w-full text-start rounded-lg font-semibold text-gray-500"
        >
          {plusIcon}
          Thêm thẻ
        </button>
      )}
    </div>
  )
}

export default Column
