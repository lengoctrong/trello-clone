import { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilteredSearchArr, setSearchValue } from './searchFilterSlice'
const Search = forwardRef(({ addFront, placeholder, className }, ref) => {
  const { cards } = useSelector((state) => state.card)
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.searchFilter.searchValue)

  const handleSearchValue = async (e) => {
    dispatch(setSearchValue(e.target.value))

    const matchedSearchValueArr = cards.filter((card) => {
      if (
        card.title.toLowerCase().trim().includes(e.target.value.toLowerCase())
      )
        return {
          _id: card._id,
          title: card.title
        }
    })
    dispatch(setFilteredSearchArr(matchedSearchValueArr))
  }

  return (
    <div
      ref={ref}
      className={`w-[200px] h-[32px] flex relative border-primaryLine border rounded-md overflow-hidden text-sm hover:border-gray-300 ${className}`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 mx-2">{addFront}</div>
      <input
        className="border-none outline-none w-full h-full px-7 hover:bg-gray-200"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchValue}
      />
    </div>
  )
})

export default Search
