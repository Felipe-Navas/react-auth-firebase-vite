import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router'
import { Alert } from './Alert'

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { login, loginWithGoogle } = useAuth()

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError((error as Error).message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return (
    <div>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          name="email"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="******"
          name="password"
          onChange={handleChange}
        />

        <button>Login</button>
      </form>

      <button onClick={handleGoogleLogin}>Google Login</button>
    </div>
  )
}
