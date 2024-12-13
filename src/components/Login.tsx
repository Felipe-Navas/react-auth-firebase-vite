import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router'
import { Alert } from './Alert'

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { login, loginWithGoogle, resetPassword } = useAuth()

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

  const handleResetPassword = async () => {
    if (!user.email) setError('Please enter your email')

    try {
      await resetPassword(user.email)
      setError('We have sent you an email with instructions on how to reset your password')
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="your@email.com"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>

          <a
            href="#"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={handleResetPassword}
          >
            Forgot your password?
          </a>
        </div>
      </form>

      <p className="my-4 text-sm flex justify-between px-3">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>

      <button
        className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
        onClick={handleGoogleLogin}
      >
        Google Login
      </button>
    </div>
  )
}
