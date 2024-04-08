import { useState } from 'react'
import { closeIcon, plusIcon } from '~/icons'
import Card from '../Card'
const Column = ({ column }) => {
  const [isAddNewCard, setIsAddNewCard] = useState(false)
  const { title, cards } = column

  const handleAddNewCard = () => {}
  return (
    <div className="bg-gray-100 max-w-[272px] max-h-[760px] overflow-y-scroll rounded-xl p-4">
      <input
        className="bg-transparent font-medium text-gray-500 outline-blue-500 rounded-md px-2 min-w-full"
        value={title}
        onChange={() => {}}
      />
      {cards.map((card) => (
        <Card key={card._id} card={card} />
      ))}

      {isAddNewCard ? (
        <>
          <textarea
            autoFocus
            rows={2}
            className="w-full  p-2 mt-2 bg-white rounded-md resize-none outline-blue-500"
            placeholder="Nhập nội dung thẻ..."
          />
          <div className="flex items-center gap-1">
            <button className="btn-primary px-2 py-1 my-1 rounded-sm bg-blue-500 text-white">
              Thêm thẻ
            </button>
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
