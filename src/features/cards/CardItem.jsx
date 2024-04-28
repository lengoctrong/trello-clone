import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
    <button
      ref={setNodeRef}
      style={CSSProperties}
      {...attributes}
      {...listeners}
      type="text"
      className={
        card.fe_placeholderCard
          ? 'p-5'
          : 'bg-white shadow-sm border-2 w-full text-start rounded-xl py-1 px-3 my-1 hover:border-blue-500'
      }
    >
      {card.title ?? ''}
    </button>
  )
}

export default CardItem
