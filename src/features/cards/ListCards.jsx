import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import CardItem from './CardItem'
const ListCards = ({ cards }) => {
  return (
    <SortableContext
      items={cards.map((card) => card._id)}
      strategy={rectSortingStrategy}
    >
      <ul>
        {cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
      </ul>
    </SortableContext>
  )
}

export default ListCards
