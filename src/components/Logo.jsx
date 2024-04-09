import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/">
      <img src="/trello.png" alt="WorldWise logo" className="h-20" />
    </Link>
  )
}

export default Logo
