import { IconButton, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis'
import { chevronLeftIcon, closeIcon } from '~/icons'
import { RIGHT_DRAWER_TYPES } from '~/utils/constants'
import { openSubRightDrawer } from '../rightDrawerSlice'

export function ArchiveDrawer({ onBack, onClose }) {
  const { columns } = useSelector((state) => state.board)
  const storedColumns = columns.filter((column) => column._destroy)
  const dispatch = useDispatch()
  const handleRestoreColumn = async (column) => {
    await updateColumnDetailsAPI(column._id, { _destroy: false }, dispatch)
    await getBoardDetailsAPI(column.boardId, dispatch)
    dispatch(openSubRightDrawer(RIGHT_DRAWER_TYPES.ARCHIVE))
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <IconButton variant="text" color="blue-gray" onClick={onBack}>
          {chevronLeftIcon}
        </IconButton>
        <div className="text-center w-full">
          <Typography variant="h5" color="blue-gray">
            Lưu trữ
          </Typography>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          {closeIcon}
        </IconButton>
      </div>

      <div className="py-1 border-t-2">
        <div className="flex justify-between">
          <input
            size={13}
            className=" border h-fit px-2 py-1 bg-transparent rounded-md"
            placeholder="Tìm kiếm lưu trữ..."
          />
          <button className="text-[12px] px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300">
            Thẻ đã lưu trữ
          </button>
        </div>
        {storedColumns.map((column) => (
          <div key={column._id}>
            <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
              <p>{column.title}</p>
              <button
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 flex gap-5"
                onClick={() => handleRestoreColumn(column)}
              >
                Hoàn trả vào bảng
              </button>
            </div>
            {storedColumns.length > 1 && (
              <div className="border-t-2 border-gray-200"></div>
            )}
          </div>
        ))}

        {storedColumns.length === 0 && (
          <div className="mt-4 text-center bg-gray-200 py-8"></div>
        )}
      </div>
    </>
  )
}
