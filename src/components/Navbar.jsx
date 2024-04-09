import Tippy from '@tippyjs/react'
import { chevIcon, searchIcon } from '~/icons'
import Search from './Search'
const Navbar = () => {
  return (
    <header className="h-12 flex justify-between items-center px-8 bg-white">
      <div className="flex gap-12">
        <div className="btn">logo</div>
        <div className="btn flex items-center gap-2">
          <p>Các không gian làm việc</p>
          {chevIcon}
        </div>

        <div className="btn flex items-center gap-2">
          <p>gần đây</p>
          {chevIcon}
        </div>
        <button className="btn">tạo mới</button>
      </div>
      <div className="flex gap-12">
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
        <div className="btn">avatar</div>
      </div>
    </header>
  )
}

export default Navbar
