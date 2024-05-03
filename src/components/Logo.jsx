import { Link } from 'react-router-dom'

function Logo({ className }) {
  return (
    <Link to="/">
      <img
        src="/trello.png"
        alt="WorldWise logo"
        className={`h-10 cursor-pointer ${className}`}
      />
    </Link>
  )
}

export default Logo
