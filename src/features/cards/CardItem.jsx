import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CardBase from '~/components/CardBase'

const CardItem = ({ card }) => {
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
    // display: card.fe_placeholderCard && 'none'
  }

  return (
    <li
      ref={setNodeRef}
      style={CSSProperties}
      {...attributes}
      {...listeners}
      type="text"
    >
      <CardBase>{card.title}</CardBase>
    </li>
  )
}

export default CardItem
