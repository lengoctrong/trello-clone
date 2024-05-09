import { Input } from '@material-tailwind/react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserDetailsAPI } from '~/apis'
import Navbar from '~/components/Navbar'
import { homeIcon, mailIcon, phoneIcon, userIcon } from '~/icons'

const Profile = () => {
  const initUser = useSelector((state) => state.user)
  const [user, setUser] = useState(initUser)
  const dispatch = useDispatch()

  const timeoutId = useRef(null)

  const handleEditProfile = (e) => {
    const updatedData = {
      ...user,
      [e.target.attributes.name.value]: e.target.value || ''
    }

    if (timeoutId.current) clearTimeout(timeoutId.current)

    setUser(updatedData)
    timeoutId.current = setTimeout(() => {
      updateUserDetailsAPI(user._id, updatedData, dispatch)

      return () => clearTimeout(timeoutId.current)
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Thông tin người dùng
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex gap-2 items-center">
                {userIcon} Tên người dùng
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 max-w-52">
                <Input
                  name="name"
                  onChange={handleEditProfile}
                  color="blue"
                  value={user.name || user.email.split('@')[0]}
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex gap-2 items-center">
                {mailIcon} Địa chỉ email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 max-w-52">
                <Input
                  name="email"
                  onChange={handleEditProfile}
                  color="blue"
                  value={user.email}
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex gap-2 items-center">
                {phoneIcon} Số điện thoại
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 max-w-52">
                <Input
                  name="phone"
                  onChange={handleEditProfile}
                  color="blue"
                  value={user.phone}
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex gap-2 items-center">
                {homeIcon} Địa chỉ
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 max-w-52">
                <Input
                  name="address"
                  onChange={handleEditProfile}
                  color="blue"
                  value={user.address}
                />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default Profile
