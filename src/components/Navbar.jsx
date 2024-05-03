import Tippy from '@tippyjs/react'

import { Link, useNavigate } from 'react-router-dom'
import { chevIcon, searchIcon } from '~/icons'
import AvatarMenu from './AvatarMenu'
import Button from './Button'
import Logo from './Logo'
import Search from './Search'
const Navbar = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('login')
  }
  return (
    <header className="h-12 flex justify-between items-center px-8 py-2 bg-white">
      <div className="flex gap-12">
        <Logo />
        <div className="btn flex items-center gap-2">
          <p>Các không gian làm việc</p>
          {chevIcon}
        </div>

        <div className="btn flex items-center gap-2">
          <p>gần đây</p>
          {chevIcon}
        </div>
        <Button primary>tạo mới</Button>
      </div>
      <div className="flex gap-12 my-auto">
        <div>
          <Tippy
            className="bg-[#42526e] text-white"
            interactive
            delay={250}
            content={
              <div className="p-2 h-[30px] flex gap-1 items-center border-none rounded-md ">
                <p>Tìm kiếm</p>
                <span className="border  px-2">/</span>
              </div>
            }
          >
            <Search addFront={searchIcon} placeholder="Tìm kiếm" />
          </Tippy>
        </div>

        {user ? (
          <AvatarMenu onLogout={handleLogout} />
        ) : (
          <Link to="login" className="btn">
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
