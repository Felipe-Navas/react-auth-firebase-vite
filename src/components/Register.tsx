import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router'
import { Alert } from './Alert'

export const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { signUp } = useAuth()

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
      await signUp(user.email, user.password)
      navigate('/')
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="your@email.com"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******"
            name="password"
            onChange={handleChange}
          />
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Register</button>
      </form>

      <p className='my-4 text-sm flex justify-between px-3'>Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link></p>

    </div>
  )
}
