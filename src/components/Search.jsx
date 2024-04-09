import { forwardRef } from 'react'
const Search = forwardRef(({ addFront, placeholder }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[200px] h-[32px] flex relative border-primaryLine border rounded-md overflow-hidden text-sm hover:border-gray-300"
    >
      <div className="absolute top-1/2 -translate-y-1/2 mx-2">{addFront}</div>
      <input
        className="border-none outline-none w-full h-full px-7 hover:bg-gray-200"
        placeholder={placeholder}
      />
    </div>
  )
})

export default Search
