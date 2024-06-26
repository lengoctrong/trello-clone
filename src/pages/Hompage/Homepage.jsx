import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBoardAPI } from '~/apis'
import Loader from '~/components/Loader'
import Navbar from '~/components/Navbar'
import { BoardForm } from '~/features/boards/BoardForm'
import { DOCUMENT_TITLE, ROUTES } from '~/utils/constants'
import CancelledBoard from './CancelledBoard'

const Homepage = () => {
  const { isPending } = useSelector((state) => state.board)
  const { isLogin } = useSelector((state) => state.user)

  const availableBoards = useSelector((state) => state.board.boards).filter(
    (board) => !board._destroy
  )

  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const handleButtonClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    document.title = DOCUMENT_TITLE.HOME
  }, [])

  useEffect(() => {
    getAllBoardAPI(dispatch)
  }, [dispatch])

  return isPending ? (
    <Loader className="flex items-center justify-center h-screen w-screen gap-4" />
  ) : (
    <>
      <Navbar />

      <div className="p-4 h-full">
        {isLogin ? (
          <>
            <div>
              <div className="my-4">
                <h1 className="text-gray-700 font-bold text-2xl py-4">
                  Các không gian làm việc của bạn
                </h1>
                {availableBoards.length === 0 && (
                  <p>
                    Bạn không phải là thành viên của bất kỳ không gian làm việc
                    nào.{' '}
                    <a className=" font-semibold text-blue-500" href="#">
                      Tạo Không gian làm việc
                    </a>
                  </p>
                )}
              </div>
              <div>
                <div className="flex gap-4 flex-wrap">
                  {availableBoards.map((board) => (
                    <Link
                      to={`${ROUTES.BOARD}/${board._id}`}
                      key={board._id}
                      className="h-[100px] w-[200px] flex justify-center items-center text-white text-2xl rounded-md hover:opacity-90 cursor-pointer "
                      style={{
                        backgroundImage: 'url(./background.jpg)',
                        backgroundSize: 'cover'
                      }}
                    >
                      <p>{board.title}</p>
                    </Link>
                  ))}
                  <BoardForm />
                </div>
              </div>
            </div>
            <button
              className="btn mt-4 bg-gray-200 hover:bg-gray-300"
              onClick={handleButtonClick}
            >
              Xem tất cả bảng đã đóng
            </button>
            {showModal && (
              <CancelledBoard title="Bảng đã đóng" onClose={handleCloseModal} />
            )}
          </>
        ) : (
          <>
            <div className=" inset-0 flex justify-center items-center">
              <h1 className="font-bold text-2xl">
                Vui lòng đăng nhập để tạo các không gian làm việc!
              </h1>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Homepage
