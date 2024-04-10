import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageNav from '~/components/PageNav'
import { useAuth } from '~/contexts/FakeAuthContext'
import Button from '../components/Button'

const Login = () => {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('abc123')

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email && password) login(email, password)
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/board', { replace: true })
  }, [isAuthenticated, navigate])

  return (
    <main className="py-10 px-20 bg-[--color-dark--1] min-h-screen font-semibold text-grey">
      <PageNav />

      <form
        className="bg-[--color-dark--2] rounded-[7px] px-8 py-12 w-[48rem] flex flex-col gap-8  mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button className="p-8" type="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  )
}

export default Login
