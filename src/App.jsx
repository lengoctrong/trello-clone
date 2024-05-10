import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout/AppLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Homepage from './pages/Hompage/Homepage'
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile'
import PrivateRoute from './routes/PrivateRoute'
import { PARAMS, ROUTES } from './utils/constants'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route
          path={`${ROUTES.PROFILE}/${PARAMS.PROFILE_ID}`}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={`${ROUTES.BOARD}/${PARAMS.BOARD_ID}`}
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        />

        <Route path={ROUTES.WILDCARD} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
