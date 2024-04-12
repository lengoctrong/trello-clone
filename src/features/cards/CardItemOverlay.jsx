const CardItemOverlay = ({ card }) => {
  return (
    <button
      type="text"
      className="bg-white shadow-sm border-2 w-full text-start rounded-xl py-1 px-3 my-1 hover:border-blue-500"
    >
      {card.title}
    </button>
  )
}

export default CardItemOverlay
