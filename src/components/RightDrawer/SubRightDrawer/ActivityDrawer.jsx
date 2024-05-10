import { IconButton, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllActivitiesAPI } from '~/apis'
import { chevronLeftIcon, closeIcon } from '~/icons'
import { timeAgo } from '~/utils/formatters'
export function ActivityDrawer({ onBack, onClose }) {
  const { boardId } = useParams()
  const activities = useSelector((state) => state.activity).filter(
    (act) => act.boardId === boardId
  )
  const dispatch = useDispatch()

  const [timeAgoStr, setTimeAgoStr] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(activities.length / itemsPerPage)
  const activitiesWithTimeAgo = activities.map((activity) => ({
    ...activity,
    timeAgoStr: timeAgo(activity.createdAt)
  }))

  const currentActivities = activitiesWithTimeAgo.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    getAllActivitiesAPI(dispatch)
  }, [dispatch])

  useEffect(() => {
    const intervalId = setInterval(() => {
      activitiesWithTimeAgo.forEach((activity) => {
        setTimeAgoStr(timeAgo(activity.createdAt))
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [activitiesWithTimeAgo])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <IconButton variant="text" color="blue-gray" onClick={onBack}>
          {chevronLeftIcon}
        </IconButton>
        <div className="text-center w-full">
          <Typography variant="h5" color="blue-gray">
            Hoạt động
          </Typography>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          {closeIcon}
        </IconButton>
      </div>
      <div className="p-2 border-t-2 flex flex-col gap-4">
        {currentActivities.map((activity, index) => (
          <div key={index}>
            <p>{activity.content}</p>
            <small>{timeAgo(activity.createdAt)}</small>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentPage < 2 ? 'hidden' : ''
          }`}
        >
          Trang trước
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            itemsPerPage <= 10 ? 'hidden' : ''
          }`}
        >
          Trang sau
        </button>
      </div>
    </>
  )
}
