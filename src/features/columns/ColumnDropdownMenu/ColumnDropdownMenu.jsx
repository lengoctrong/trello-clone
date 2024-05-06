import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { CopyColumnForm } from './components/CopyColumnForm/CopyColumnForm'
import { DeleteColumnForm } from './components/DeleteColumnForm/DeleteColumnForm'
import { MoveColumnForm } from './components/MoveColumnForm/MoveColumnForm'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const ColumnDropdownMenu = ({ columnId }) => {
  const [openDeleteForm, setOpenDeleteForm] = useState(false)
  const [openCopyForm, setOpenCopyForm] = useState(false)
  const [openMoveForm, setOpenMoveForm] = useState(false)

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Thêm thẻ
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => setOpenCopyForm(!openCopyForm)}
                  >
                    Sao chép danh sách
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => setOpenMoveForm(!openMoveForm)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Di chuyển danh sách
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Theo dõi
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => setOpenDeleteForm(!openDeleteForm)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Xóa
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <CopyColumnForm
        columnId={columnId}
        open={openCopyForm}
        handleOpen={() => setOpenCopyForm(!openCopyForm)}
        handleCancel={() => setOpenCopyForm(false)}
      />
      <MoveColumnForm
        columnId={columnId}
        open={openMoveForm}
        handleOpen={() => setOpenMoveForm(!openMoveForm)}
        handleCancel={() => setOpenMoveForm(false)}
      />
      <DeleteColumnForm
        columnId={columnId}
        open={openDeleteForm}
        handleOpen={() => setOpenDeleteForm(!openDeleteForm)}
        handleCancel={() => setOpenDeleteForm(false)}
      />
    </>
  )
}

export default ColumnDropdownMenu
