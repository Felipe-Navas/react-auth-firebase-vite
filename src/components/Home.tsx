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
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl mb-4">
          Welcome {user?.displayName || user?.email}
        </h1>

        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
