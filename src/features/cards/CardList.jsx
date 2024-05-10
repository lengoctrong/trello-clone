import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
// import { useState } from 'react'
import CardItem from './CardItem'
const CardList = ({ cards }) => {
  // const [cards, setCards] = useState(initCards)

  return (
    <SortableContext
      items={cards?.map((card) => card._id)}
      strategy={rectSortingStrategy}
    >
      <ul>
        {cards?.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
      </ul>
    </SortableContext>
  )
}

export default CardList
