import { useSelector } from 'react-redux'
import { archiveBoxXMarkIcon, closeIcon, trashIcon } from '~/icons'

const CancelledBoard = ({ title, onClose }) => {
  const deletedBoards = useSelector((state) => state.board.boards).filter(
    (board) => board._destroy
  )

  console.log('deletedBoards', deletedBoards)

  const handleClose = (e) => {
    if (e.target.closest('.overlay')) {
      onClose()
    }
    onClose()
  }
  return (
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
                  <p>board title</p>
                </div>

                <div className="flex h-fit w-fit gap-2 text-white">
                  <button className="px-2 py-1 rounded-md hover:opacity-90 bg-blue-700">
                    Mở lại
                  </button>
                  <button className="px-2 py-1 rounded-md hover:opacity-90 bg-red-700 flex gap-2">
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
  )
}

export default CancelledBoard
