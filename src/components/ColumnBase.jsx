import ListCards from '~/features/cards/ListCards'
import { plusIcon } from '~/icons'
import Button from './Button'
import FormAddNew from './FormAddNew'

const MAX_WIDTH_COLUMN = '272px'
const MAX_HEIGHT_COLUMN = '760px'

const ColumnBase = ({ children }) => {
  return (
    <div
      className={`bg-gray-100 max-h-[${MAX_HEIGHT_COLUMN}] max-w-[${MAX_WIDTH_COLUMN}] w-[272px] rounded-xl p-4 h-full cursor-pointer`}
    >
      {children}
    </div>
  )
}

export default ColumnBase
