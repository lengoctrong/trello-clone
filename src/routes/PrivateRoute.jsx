import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '~/utils/constants'

const PrivateRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.user)
  return isLogin ? children : <Navigate to={ROUTES.LOGIN} />
}

export default PrivateRoute
