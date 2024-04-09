import Card from './Card'

const ListCards = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </div>
  )
}

export default ListCards
