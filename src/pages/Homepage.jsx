import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBoardAPI } from '~/apis'
import Loader from '~/components/Loader'
import Navbar from '~/components/Navbar'
import { BoardForm } from '~/features/boards/BoardForm'

const Homepage = () => {
  const { isPending } = useSelector((state) => state.board)
  const dispatch = useDispatch()
  useEffect(() => {
    getAllBoardAPI(dispatch)
  }, [dispatch])

  const boards = useSelector((state) => state.board.boards)

  return isPending ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className=" p-4">
        <div className="my-4">
          <h1 className="text-gray-700 font-bold text-2xl py-4">
            Các không gian làm việc của bạn
          </h1>
          {boards.length === 0 && (
            <p>
              Bạn không phải là thành viên của bất kỳ không gian làm việc nào.{' '}
              <a className=" font-semibold text-blue-500" href="#">
                Tạo Không gian làm việc
              </a>
            </p>
          )}
        </div>
        <div>
          <div className="flex gap-4 flex-wrap">
            {boards.map((board) => (
              <Link
                to={`/b/${board._id}`}
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
    </>
  )
}

export default Homepage
