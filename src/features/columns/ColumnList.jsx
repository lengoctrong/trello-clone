import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewColumnAPI } from '~/apis'
import FormAddNew from '~/components/FormAddNew'
import { plusIcon } from '~/icons'
import Column from './Column'
const ColumnList = ({ columns }) => {
  const [toggleAddColumnForm, setToggleAddColumnForm] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  const { _id: boardId } = useSelector((state) => state.board)
  const dispatch = useDispatch()

  const handleAddNewColumn = async (e) => {
    e.preventDefault()
    if (!columnTitle.trim().length) {
      setToggleAddColumnForm(false)
      return
    }
    // add new column
    const columnData = {
      title: columnTitle,
      boardId
    }
    await createNewColumnAPI(columnData, dispatch)
    // reset form
    setColumnTitle('')
    setToggleAddColumnForm(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddNewColumn(e)
    }
  }

  const FormAddNewProps = {
    textAreaRows: 1,
    onSubmit: handleAddNewColumn,
    onKeyDown: handleKeyDown,
    textAreaTitle: columnTitle,
    btnAddTitle: 'Thêm danh sách',
    setTitle: setColumnTitle,
    toggleAddForm: toggleAddColumnForm,
    setToggleAddForm: setToggleAddColumnForm,
    placeholder: 'Nhập tiêu đề danh sách...',
    className: 'py-0'
  }

  return (
    <>
      <SortableContext
        items={columns.map((column) => column._id)}
        strategy={horizontalListSortingStrategy}
      >
        <ul className="flex gap-4 mt-3">
          {columns.map((column, idx) => (
            <Column key={`${column._id}${idx}`} column={column} />
          ))}
          {toggleAddColumnForm ? (
            <div className={'bg-gray-100 min-w-[272px] rounded-xl p-2 h-full'}>
              <FormAddNew {...FormAddNewProps} />
            </div>
          ) : (
            <button
              className={
                'bg-gray-100 bg-opacity-25 text-white min-w-[272px] rounded-xl p-4 h-full cursor-pointer hover:bg-opacity-30'
              }
              onClick={() => setToggleAddColumnForm(!toggleAddColumnForm)}
            >
              <p className="flex gap-1 items-center">
                <span>{plusIcon}</span>
                Thêm danh sách khác
              </p>
            </button>
          )}
        </ul>
      </SortableContext>
    </>
  )
}

export default ColumnList