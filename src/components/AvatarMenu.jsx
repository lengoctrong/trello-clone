import { Menu, Transition } from '@headlessui/react'

import { Avatar } from '@material-tailwind/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const AvatarMenu = ({ onLogout }) => {
  return (
    <Menu as="div" className="relative inline-block text-left cursor-pointer">
      <div>
        <Menu.Button>
          <Avatar
            className="h-8 w-8"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
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
                <Link
                  to="/profile"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Xem thông tin
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={onLogout}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Đăng xuất
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default AvatarMenu
