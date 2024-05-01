const CardBase = ({ children }) => {
  return (
    <div
      className={
        'bg-white shadow-sm border-2 w-full text-start rounded-xl py-1 px-3 my-2 hover:border-blue-500'
      }
    >
      {children}
    </div>
  )
}

export default CardBase
