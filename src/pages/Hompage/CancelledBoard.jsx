import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AlertDialog from '~/components/AlertDialog'
import { archiveBoxXMarkIcon, closeIcon, trashIcon } from '~/icons'
import { ROUTES } from '~/utils/constants'

const CancelledBoard = ({ title, onClose }) => {
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false)
  const deletedBoards = useSelector((state) => state.board.boards).filter(
    (board) => board._destroy
  )

  const handleClose = (e) => {
    if (e.target.closest('.overlay')) {
      onClose()
    }
    onClose()
  }

  const deleteBoardPermanently = () => {
    // call api to delete board permanently
  }

  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center">
        <div
          className="overlay absolute inset-0 bg-black opacity-50"
          onClick={handleClose}
        ></div>

        <div className="bg-white relative mt-16 p-4 rounded shadow-lg w-1/2 min-h-[156px]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold flex gap-2 items-center">
              {archiveBoxXMarkIcon} {title}
            </h2>
            <button onClick={handleClose}>{closeIcon}</button>
          </div>

          {deletedBoards.map((board) => (
            <div key={board._id}>
              <div className="mt-4 text-center py-4 scroll-auto p-4 max-h-[50vh]">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      src="/background.jpg"
                      alt="board-img"
                      className="max-w-12 max-h-24 object-cover"
                    />
                    <Link
                      to={`${ROUTES.BOARD}/${board._id}`}
                      className="text-blue-700 hover:underline"
                    >
                      {board.title}
                    </Link>
                  </div>

                  <div className="flex h-fit w-fit gap-2 text-white">
                    <button className="px-2 py-1 rounded-md hover:opacity-90 bg-blue-700">
                      Mở lại
                    </button>
                    <button
                      className="px-2 py-1 rounded-md hover:opacity-90 bg-red-700 flex gap-2"
                      onClick={() => setIsShowDeleteDialog(true)}
                    >
                      {trashIcon} Xóa
                    </button>
                  </div>
                </div>
              </div>
              {deletedBoards.length > 1 && (
                <div className="border-t-2 border-gray-200"></div>
              )}
            </div>
          ))}

          {deletedBoards.length === 0 && (
            <div className="mt-4 text-center bg-gray-200 py-8">
              <p>Chưa có bảng nào được đóng</p>
            </div>
          )}
        </div>
      </div>
      <AlertDialog
        open={isShowDeleteDialog}
        onClose={() => setIsShowDeleteDialog(false)}
        onConfirm={deleteBoardPermanently}
        dialogHeader="Xóa bảng?"
        dialogBody="Tất cả các thẻ trong bảng sẽ bị xóa vĩnh viễn. Bạn có chắc chắn muốn xóa bảng này?"
        cancelButtonText="Hủy bỏ"
        confirmButtonText="Xóa"
      />
    </>
  )
}

export default CancelledBoard
