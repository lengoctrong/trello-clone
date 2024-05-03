import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createNewCardAPI, deleteColumnDetailsAPI } from '~/apis'
import { AlertDialog } from '~/components/AlertDialog'

import ColumnBase from '~/components/ColumnBase'
import DropdownMenu from '~/components/DropdownMenu'
import FormAddNew from '~/components/FormAddNew'
import ListCards from '~/features/cards/ListCards'
import { plusIcon } from '~/icons'
import { mapOrderedArr } from '~/utils/formatters'

const Column = ({ column }) => {
  const { _id: columnId, title, cards, cardOrderIds } = column
  const [orderedCards, setOrderedCards] = useState(cards)
  const [columnTitle, setColumnTitle] = useState(title)
  const [cardTitle, setCardTitle] = useState('')
  const [toggleAddCardForm, setToggleAddCardForm] = useState(false)

  const [showDialog, setShowDialog] = useState(false)

  const { _id: boardId } = useSelector((state) => state.board)
  const dispatch = useDispatch()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: columnId, data: { ...column } })

  const CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined
  }

  useEffect(() => {
    setOrderedCards(mapOrderedArr(cards, cardOrderIds, '_id'))
  }, [cards, cardOrderIds])

  const handleAddNewCard = (e) => {
    e.preventDefault()
    if (!cardTitle.trim().length) {
      setToggleAddCardForm(false)
      return
    }
    // add new card
    const cardData = {
      title: cardTitle,
      boardId,
      columnId
    }
    createNewCardAPI(cardData, dispatch)
    // reset form
    setCardTitle('')
    setToggleAddCardForm(false)
  }

  const ColumnBaseProps = {
    title
  }

  const handleConfirmDeleteColumn = async () => {
    const optsToast = {
      position: 'bottom-left'
    }
    try {
      const res = await deleteColumnDetailsAPI(columnId, dispatch)

      toast.success(res.data.deleteResult ?? 'Xoá thành công', optsToast)
    } catch (err) {
      toast.error(err.message, optsToast)
    } finally {
      setShowDialog(false)
    }
  }
  const handleCancelDeleteColumn = () => {
    setShowDialog(false)
  }

  return (
    <>
      <li
        ref={setNodeRef}
        style={CSSProperties}
        {...attributes}
        {...listeners}
        className="h-full"
      >
        <ColumnBase {...ColumnBaseProps}>
          <div className="flex justify-around">
            <input
              className="bg-transparent font-bold text-gray-600 outline-blue-500 rounded-md px-2 w-full focus:bg-white"
              data-no-dnd
              value={columnTitle}
              size={columnTitle?.length}
              onChange={(e) => setColumnTitle(e.target.value)}
            />
            <DropdownMenu onDeleteColumn={() => setShowDialog(true)} />
          </div>

          <ListCards cards={orderedCards} />

          {toggleAddCardForm ? (
            <FormAddNew
              textAreaRows={2}
              onSubmit={handleAddNewCard}
              textAreaTitle={cardTitle}
              btnAddTitle="Thêm thẻ"
              setTitle={setCardTitle}
              toggleAddForm={toggleAddCardForm}
              setToggleAddForm={setToggleAddCardForm}
              placeholder="Nhập tiêu đề cho thẻ này..."
            />
          ) : (
            <div
              type="outline"
              className="w-full"
              onClick={() => setToggleAddCardForm(!toggleAddCardForm)}
            >
              <div className="bg-transparent items-center w-full text-start rounded-xl py-1 px-3 my-2 hover:bg-gray-300">
                <div className="flex gap-2 min-w-full">
                  {plusIcon}
                  <p>Thêm thẻ</p>
                </div>
              </div>
            </div>
          )}
        </ColumnBase>
      </li>
      <AlertDialog
        open={showDialog}
        handleOpen={setShowDialog}
        handleConfirm={handleConfirmDeleteColumn}
        handleCancel={handleCancelDeleteColumn}
      />
    </>
  )
}

export default Column
