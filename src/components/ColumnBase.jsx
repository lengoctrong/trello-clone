import ListCards from '~/features/cards/ListCards'
import { MAX_HEIGHT_COLUMN, MAX_WIDTH_COLUMN } from '~/utils/constants'
import { mapOrderedArr } from '~/utils/formatters'

const ColumnBase = ({ children, overlay, data = null }) => {
  const orderedCards = mapOrderedArr(data?.cards, data?.cardOrderIds, '_id')

  return (
    <div
      className={`bg-gray-100 max-h-[${MAX_HEIGHT_COLUMN}] max-w-[${MAX_WIDTH_COLUMN}] w-[272px] rounded-xl p-4 h-full cursor-pointer`}
    >
      {overlay ? (
        <>
          <input
            className="bg-transparent font-medium text-gray-500 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
            value={data?.title}
            size={data?.title?.length}
            onChange={() => {}}
          />

          <ListCards cards={orderedCards} />
        </>
      ) : (
        children
      )}
    </div>
  )
}

export default ColumnBase
