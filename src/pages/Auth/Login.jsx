import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUserDetailsAPI, verifyUserDetailsAPI } from '~/apis'
import Logo from '~/components/Logo'
import { AUTH_TYPES, ROUTES } from '~/utils/constants'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initUserData = {
    email: '',
    password: ''
  }
  const [userData, setUserData] = useState(initUserData)

  const validateUserData = (userData) => {
    const { email, password } = userData

    if (!email.trim() || !password.trim()) {
      toast.warn('Hãy điền đầy đủ thông tin.')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.warn('Email không hợp lệ.')
      return false
    }

    if (password.length < 8) {
      toast.warn('Mật khẩu phải chứa ít nhất 8 ký tự.')
      return false
    }

    return true
  }

  const handleInputUser = (e) => {
    const updatedUser = {
      ...userData,
      [e.target.name]: e.target.value
    }
    setUserData(updatedUser)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const isValid = validateUserData(userData)
      if (!isValid) return
      const result = await verifyUserDetailsAPI(
        { ...userData, type: AUTH_TYPES.LOGIN },
        dispatch
      )
      await updateUserDetailsAPI(result._id, { isLogin: true }, dispatch)
      navigate(ROUTES.HOME)
    } catch (err) {
      toast.error(err.message || 'Đăng nhập thất bại')
    } finally {
      // reset form
      setUserData(initUserData)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <Logo className="h-20" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Đăng nhập vào tài khoản của bạn
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Địa chỉ email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={userData.email}
                onChange={handleInputUser}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mật khẩu
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={userData.password}
                onChange={handleInputUser}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Bạn chưa có tài khoản?{' '}
          <Link
            to={ROUTES.REGISTER}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
