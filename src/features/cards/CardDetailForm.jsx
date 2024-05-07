import { Textarea } from '@material-tailwind/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCardDetailsAPI } from '~/apis'
import Button from '~/components/Button'
import {
  bars3CenterLeftIcon,
  cardIcon,
  closeIcon,
  eyeIcon,
  listBulletIcon
} from '~/icons'

const CardDetailForm = ({ onOpen }) => {
  const dispatch = useDispatch()
  const {
    _id: cardId,
    title: cardTitle,
    columnId,
    description
  } = useSelector((state) => state.card.card)
  const { title: columnTitle } = useSelector(
    (state) => state.board.columns
  ).find((c) => c._id === columnId)
  const [desc, setDesc] = useState(description ?? '')
  const [showDescForm, setShowDescForm] = useState(false)

  const handleSaveDescForm = () => {
    setShowDescForm(false)
    // Call API to save description
    updateCardDetailsAPI(cardId, { description: desc }, dispatch)
  }
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target.className?.includes('overlay')) onOpen(false)
      }}
    >
      <div className="overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-3/4 max-w-2xl text-gray-700">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center font-bold">
            {cardIcon} {cardTitle}
          </div>
          <button
            className="hover:bg-gray-200 rounded-full p-2"
            onClick={() => onOpen(false)}
          >
            {closeIcon}
          </button>
        </div>

        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-y-8 col-span-2 pr-8">
            <div>
              <p>
                trong danh sách <span className="underline">{columnTitle}</span>
              </p>
            </div>

            <div className="ps-8">
              <p>Thông báo</p>
              <button className="btn flex gap-2 bg-gray-200">
                {' '}
                {eyeIcon} Theo dõi
              </button>
            </div>

            <div>
              <div className="flex gap-2">{bars3CenterLeftIcon}Mô tả</div>
              <Textarea
                color="blue"
                placeholder="Nhập mô tả..."
                value={desc}
                onClick={() => setShowDescForm(true)}
                onChange={(e) => setDesc(e.target.value)}
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

          <div>
            <div className="flex items-center mb-2">
              <span className="material-icons">folder_open</span>
              <span>Mở thẻ</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons">label</span>
              <span>Chỉnh sửa nhãn</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons">person</span>
              <span>Thay đổi thành viên</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons">image</span>
              <span>Thay đổi bìa</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons">date_range</span>
              <span>Chỉnh sửa ngày</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons">move_to_inbox</span>
              <span>Di chuyển</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons">file_copy</span>
              <span>Sao chép</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons">archive</span>
              <span>Lưu trữ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetailForm
