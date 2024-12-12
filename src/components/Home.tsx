import { useAuth } from '../context/authContext'

export const Home = () => {
  const { user, logout, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Welcome {user?.displayName || user?.email}</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
