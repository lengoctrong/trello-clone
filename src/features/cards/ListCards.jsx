import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import CardItem from './CardItem'
const ListCards = ({ cards }) => {
  return (
    <SortableContext
      items={cards.map((card) => card._id)}
      strategy={verticalListSortingStrategy}
    >
      {cards.map((card) => (
        <CardItem key={card._id} card={card} />
      ))}
    </SortableContext>
  )
}

export default ListCards
