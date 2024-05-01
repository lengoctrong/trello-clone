import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import FormAddNew from '~/components/FormAddNew'
import { plusIcon } from '~/icons'
import Column from './Column'
const ListColumn = ({ columns }) => {
  const [toggleAddColumnForm, setToggleAddColumnForm] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  const handleSubmit = (e) => {
    if (!columnTitle) return
    e.preventDefault()
  }
  return (
    <>
      <SortableContext
        items={columns.map((column) => column._id)}
        strategy={horizontalListSortingStrategy}
      >
        <ul className="flex gap-4 mt-3">
          {columns.map((column) => (
            <Column key={column._id} column={column} />
          ))}
          {toggleAddColumnForm ? (
            <div className={'bg-gray-100 w-[272px] rounded-xl p-2 h-full'}>
              <FormAddNew
                textAreaRows={1}
                onSubmit={handleSubmit}
                textAreaTitle={columnTitle}
                btnAddTitle="Thêm danh sách"
                setTitle={setColumnTitle}
                toggleAddForm={toggleAddColumnForm}
                setToggleAddForm={setToggleAddColumnForm}
                placeholder="Nhập tiêu đề danh sách..."
                className="py-0"
              />
            </div>
          ) : (
            <button
              className={
                'bg-gray-100 bg-opacity-25 text-white w-[272px] rounded-xl p-4 h-full cursor-pointer hover:bg-opacity-30'
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

export default ListColumn
