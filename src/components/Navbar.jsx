import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { chevIcon, searchIcon } from '~/icons'
import { MAX_HEIGHT_COLUMN, MAX_WIDTH_COLUMN } from '~/utils/constants'
import Search from '../features/searchFilter/Search'
import AvatarMenu from './AvatarMenu'
import Button from './Button'
import Logo from './Logo'

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const filteredSearchArr = useSelector(
    (state) => state.searchFilter.filteredSearchArr
  )

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <header className="h-12 flex justify-between items-center px-8 py-2 bg-white">
      <div className="flex gap-12">
        <Logo />
      </div>
      <div className="flex gap-12 my-auto ">
        <div>
          <Tippy
            interactive
            trigger="click"
            hideOnClick={true}
            placement="bottom-start"
            content={
              <ul
                className={`p-2 flex flex-col gap-1 items-center border-none rounded-md bg-white text-gray-500 w-96 overflow-y-auto max-h-[${MAX_HEIGHT_COLUMN}] overflow-x-hidden shadow-md min-w-[${MAX_WIDTH_COLUMN}]`}
              >
                {filteredSearchArr.length > 0 &&
                  filteredSearchArr.map((item, idx) => {
                    return (
                      <div key={`${item}${idx}`} className="btn w-full">
                        {item}
                      </div>
                    )
                  })}
              </ul>
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
