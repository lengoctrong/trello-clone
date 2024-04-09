import { moreIcon } from '~/icons'
const Header = () => {
  return (
    <div className="flex justify-between py-3">
      <input
        className=" btn font-medium outline-blue-500"
        value={'Board Title'}
        size={6}
        onChange={() => {}}
      />
      <button className="btn items-center bg-white">{moreIcon}</button>
    </div>
  )
}

export default Header
