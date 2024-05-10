import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchIcon } from '~/icons'
import { MAX_HEIGHT_COLUMN, MAX_WIDTH_COLUMN, ROUTES } from '~/utils/constants'
import Search from '../features/searchFilter/Search'
import AvatarMenu from './AvatarMenu'
import Logo from './Logo'

const Navbar = () => {
  const { isLogin } = useSelector((state) => state.user)
  const filteredSearchArr = useSelector(
    (state) => state.searchFilter.filteredSearchArr
  )

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
                {isLogin && filteredSearchArr.length > 0 ? (
                  filteredSearchArr.map((item) => {
                    return (
                      <div key={`${item._id}`} className="btn w-full">
                        {item.title}
                      </div>
                    )
                  })
                ) : (
                  <div className="btn w-full">Không có kết quả...</div>
                )}
              </ul>
            }
          >
            <Search addFront={searchIcon} placeholder="Tìm kiếm" />
          </Tippy>
        </div>

        {isLogin ? (
          <AvatarMenu />
        ) : (
          <Link to={ROUTES.LOGIN} className="btn">
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
