/* eslint-disable indent */
import { Input, Textarea } from '@material-tailwind/react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Datepicker from 'react-tailwindcss-datepicker'
import { updateCardDetailsAPI } from '~/apis'
import Button from '~/components/Button'
import {
  archiveBoxIcon,
  arrowRightIcon,
  bars3CenterLeftIcon,
  cardIcon,
  closeIcon,
  copyIcon,
  eyeIcon,
  listBulletIcon,
  paperClipIcon,
  photoIcon
} from '~/icons'

const CardDetailForm = ({ onOpen }) => {
  const dispatch = useDispatch()
  const initCard = useSelector((state) => state.card.card)
  const { title: columnTitle } = useSelector(
    (state) => state.board.columns
  ).find((c) => c._id === initCard.columnId)
  const [card, setCard] = useState(initCard)
  const [showDescForm, setShowDescForm] = useState(false)
  const [timer, setTimer] = useState({
    startDate: new Date(initCard.taskTimer?.startDate),
    endDate: new Date(initCard.taskTimer?.endDate)
  })
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [color, setColor] = useState('#ffffff')
  const timeoutId = useRef(null)

  const handleSaveDescForm = () => {
    setShowDescForm(false)
    // Call API to save description
    updateCardDetailsAPI(card._id, card, dispatch)
  }

  const handleTimerChange = async ({ startDate, endDate }) => {
    console.log('startDate', startDate, 'endDate', endDate)
    setTimer({ startDate, endDate })
    const now = new Date()
    const formattedStartDate = new Date(startDate)
    const formattedEndDate = new Date(endDate)

    const status = checkTaskTimerStatus(now, endDate)

    const formattedDate = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status
    }

    await updateCardDetailsAPI(card._id, { taskTimer: formattedDate }, dispatch)
  }

  const handleCardChange = (e) => {
    if (e.target.name === 'description') {
      setCard({
        ...card,
        description: e.target.value
      })
      return
    }

    const updatedData = {
      ...card,
      [e.target.attributes.name.value]: e.target.value || ''
    }

    if (timeoutId.current) clearTimeout(timeoutId.current)

    setCard(updatedData)
    timeoutId.current = setTimeout(() => {
      updateCardDetailsAPI(card._id, updatedData, dispatch)

      return () => clearTimeout(timeoutId.current)
    }, 2000)
  }

  const checkTaskTimerStatus = (nowStr, endDateStr) => {
    const now = new Date(nowStr).getTime()
    const oneDay = 24 * 60 * 60 * 1000
    const endDate = new Date(endDateStr).getTime()

    if (endDate < now) {
      return 'danger'
    }

    if (endDate > now && Math.abs(endDate - now) / oneDay <= 1) {
      return 'warning'
    }
    return 'normal'
  }

  const generateTaskTimerStatus = (status) => {
    switch (status) {
      case 'danger':
        return (
          <div className="bg-red-700 min-w text-white text-xs px-1 font-bold">
            Quá hạn
          </div>
        )
      case 'warning':
        return (
          <div className="bg-yellow-700 min-w text-gray text-xs px-1 font-bold">
            Sắp hết hạn
          </div>
        )
      default:
        return ''
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) => {
        if (typeof e.target.className !== 'string') return
        const className = e.target.baseVal ?? e.target.className
        if (className?.includes('overlay')) onOpen(false)
      }}
    >
      <div className="overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-3/4 max-w-2xl text-gray-700">
        <div
          style={{ backgroundColor: color }}
          className="backGround h-20"
        ></div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            {cardIcon}
            <Input
              name="title"
              variant="static"
              color="blue"
              value={card.title}
              onChange={handleCardChange}
              className="flex gap-2 items-center font-bold"
            />
          </div>

          <button
            className="hover:bg-gray-200 rounded-full p-2"
            onClick={() => onOpen(false)}
          >
            {closeIcon}
          </button>
        </div>

        <div className="grid grid-cols-6">
          <div className="flex flex-col gap-y-8 col-span-5 pr-8">
            <div>
              <p>
                trong danh sách <span className="underline">{columnTitle}</span>
              </p>
            </div>

            <div className="ps-8 flex">
              <div className="">
                <small>Thông báo</small>
                <div className="flex gap-2 items-center flex-wrap">
                  <button className="btn flex gap-2 bg-gray-200">
                    {' '}
                    {eyeIcon} Theo dõi
                  </button>
                </div>
              </div>
              <div className="ps-8">
                <div className="flex gap-2 items-center">
                  <small className="px-4">Ngày bắt đầu - Ngày hết hạn</small>
                  {generateTaskTimerStatus(initCard.taskTimer?.status)}
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <Datepicker
                    primaryColor="blue"
                    useRange={false}
                    displayFormat={'DD/MM/YYYY'}
                    value={timer}
                    onChange={handleTimerChange}
                    containerClassName="w-fit"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2">{bars3CenterLeftIcon}Mô tả</div>
              <Textarea
                name="description"
                color="blue"
                placeholder="Nhập mô tả..."
                value={card.description}
                onClick={() => setShowDescForm(true)}
                onChange={handleCardChange}
              />
              {showDescForm && (
                <div className="flex gap-2 items-center">
                  <Button
                    primary
                    className="w-fit h-fit"
                    onClick={handleSaveDescForm}
                  >
                    Lưu
                  </Button>
                  <button
                    className="btn w-fit h-fit py-1 px-3"
                    onClick={() => setShowDescForm(false)}
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2">{listBulletIcon} Hoạt động</div>
              <button className="btn bg-gray-200">Hiện chi tiết</button>
            </div>
          </div>

          <div className="text-xs">
            <p>Thêm vào thẻ</p>

            <div className="flex items-center mb-2">
              <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 flex gap-2 w-full items-center">
                {paperClipIcon} Đính kém
              </button>
            </div>
            <div className="flex items-center mb-2">
              <button
                className=" bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 flex items-center w-full gap-2 "
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              >
                {photoIcon} Ảnh bìa
              </button>
            </div>

            <p>Thao tác</p>
            <div className="flex items-center mb-2">
              <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 flex gap-2  items-center w-full">
                {arrowRightIcon} Di chuyển
              </button>
            </div>
            <div className="flex items-center mb-2">
              <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 flex  gap-2 w-full items-center">
                {copyIcon} Sao chép
              </button>
            </div>
            <div className="flex items-center mb-2">
              <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 flex items-center w-full gap-2 ">
                {archiveBoxIcon} Lưu trữ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetailForm
