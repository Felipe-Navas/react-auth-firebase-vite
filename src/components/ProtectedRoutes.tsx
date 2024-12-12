import { Navigate } from 'react-router'
import { useAuth } from '../context/authContext'

interface Props {
  children: React.ReactNode
}

export const ProtectedRoutes = ({ children }: Props) => {
  const { user, loading } = useAuth()

  if (loading) return <h1>Loading...</h1>

  if (!user) return <Navigate to="/login" />

  return <>{children}</>
}
