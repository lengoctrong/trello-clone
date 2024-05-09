import { Menu, Transition } from '@headlessui/react'

import { Avatar } from '@material-tailwind/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUserAPI } from '~/apis'
import { ROUTES } from '~/utils/constants'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const AvatarMenu = () => {
  const dispatch = useDispatch()

  const { _id: userId } = useSelector((state) => state.user)

  const handleLogout = () => {
    logoutUserAPI(userId, { isLogin: false }, dispatch)
  }
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
                  to={`${ROUTES.PROFILE}/${userId}`}
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
                  onClick={handleLogout}
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
