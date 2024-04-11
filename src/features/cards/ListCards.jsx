import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { mapOrderedArr } from '~/helpers'
import CardItem from './CardItem'
import CardOverlay from './CardOverlay'
const ListCards = ({ cards, cardOrderIds }) => {
  const [active, setActive] = useState(null)
  const activeCard = useMemo(
    () => cards.find((card) => card._id === active?._id),
    [active, cards]
  )

  const [orderedCards, setOrderedCards] = useState(
    mapOrderedArr(cards, cardOrderIds, '_id')
  )

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(pointerSensor)

  const handleDragEnd = ({ active, over }) => {
    setActive(null)
    if (!over || active.id === over.id) return
    setOrderedCards((prevCards) => {
      const oldIndex = prevCards.findIndex((c) => c._id === active.id)
      const newIndex = prevCards.findIndex((c) => c._id === over.id)

      return arrayMove(prevCards, oldIndex, newIndex)
    })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={cards.map((card) => card._id)}>
        <ul>
          {orderedCards.map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
        </ul>
      </SortableContext>

      <CardOverlay>
        {activeCard ? (
          <CardItem id={activeCard._id}>{activeCard.title}</CardItem>
        ) : null}
      </CardOverlay>
    </DndContext>
  )
}

export default ListCards
