import { Link } from 'react-router-dom'
import { ROUTES } from '~/utils/constants'

function Logo({ className }) {
  return (
    <Link to={ROUTES.HOME}>
      <img
        src="/trello.png"
        alt="WorldWise logo"
        className={`h-10 cursor-pointer ${className}`}
      />
    </Link>
  )
}

export default Logo
