const Card = ({ type = 'button', title, onChangeTitle, card }) => {
  if (type === 'textArea') {
    return (
      <textarea
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        autoFocus
        rows={2}
        className="w-full p-2 mt-2 bg-white rounded-md resize-none outline-blue-500"
        placeholder="Nhập tiêu đề cho thẻ này..."
      />
    )
  }
  if (type === 'button')
    return (
      <input
        type="text"
        className="bg-white shadow-sm border-2 w-full text-start rounded-xl py-1 px-3 my-1 hover:border-blue-500 cursor-pointer"
        value={card.title}
        onChange={() => {}}
      />
    )
}

export default Card
