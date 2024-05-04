import { Menu, Transition } from '@headlessui/react'
import { set } from 'lodash'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const DropdownMenu = () => {
  const { boardId } = useParams()
  const currBoard = useSelector((state) => state.board.boards).find(
    (board) => board._id === boardId
  )
  const boards = useSelector((state) => state.board.boards)
  const dispatch = useDispatch()
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <div className="btn">{currBoard.title}</div>
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
          <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {boards.map((board) => {
              return (
                <Menu.Item key={board._id}>
                  {({ active }) => (
                    <div
                      onClick={() => {}}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm cursor-pointer'
                      )}
                    >
                      {board.title}{' '}
                      {board._id === currBoard._id && '(Hiện tại)'}
                    </div>
                  )}
                </Menu.Item>
              )
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default DropdownMenu
