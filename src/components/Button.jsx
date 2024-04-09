const Button = ({ type, className, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 my-1 rounded-sm ${
        type === 'primary' ? 'bg-blue-500 ' : 'bg-gray-500'
      } text-white ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
