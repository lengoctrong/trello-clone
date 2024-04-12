import { useState } from 'react'
import Button from '~/components/Button'
import { closeIcon, plusIcon } from '~/icons'
import CardItem from '../cards/CardItem'
import ListCards from '../cards/ListCards'

const ColumnItemOverlay = ({ column }) => {
  const { _id: columnId, title, cards, cardOrderIds } = column

  const [adding, setAdding] = useState(false)
  const [cardTitle, setCardTitle] = useState('')

  return (
    <div className="bg-gray-100 max-w-[272px] max-h-[760px] rounded-xl p-4 h-full cursor-pointer">
      <input
        className="bg-transparent font-medium text-gray-500 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
        value={title}
        onChange={() => {}}
      />
      {cards.map((card) => (
        <CardItem key={card._id} card={card} />
      ))}

      {adding ? (
        <form>
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

export default ColumnItemOverlay
