import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Homepage from './pages/Hompage/Homepage'
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile'
import PrivateRoute from './routes/PrivateRoute'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="b/:boardId"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
