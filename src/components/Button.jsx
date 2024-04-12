const Button = ({ type = 'button', primary, className, children, onClick }) => {
  if (type === 'outline') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-transparent w-full text-start rounded-xl py-1 px-3 my-1 hover:bg-slate-300 cursor-pointer ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-2 py-1 my-1 rounded-sm ${
        primary ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'
      } text-white  ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
