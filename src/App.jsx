import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/FakeAuthContext'
import AppLayout from './pages/AppLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="board" element={<AppLayout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
