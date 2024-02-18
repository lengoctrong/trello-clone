import { chevIcon } from '~/icons'
const Header = () => {
  return (
    <header className="h-12 flex justify-between items-center px-8">
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
      <div className="btn">avatar</div>
    </header>
  )
}

export default Header
