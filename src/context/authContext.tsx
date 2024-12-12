import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { createContext, useContext } from 'react'
import { auth } from '../firebase'

interface Props {
  children: React.ReactNode
}

interface AuthContext {
  signUp: (email: string, password: string) => Promise<UserCredential>
}

const authContext = createContext<AuthContext | null>(null)

export const useAuth = () => {
  const context  = useContext(authContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}

export const AuthProvider = ({ children }: Props) => {
  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)

  return (
    <authContext.Provider value={{ signUp }}>{children}</authContext.Provider>
  )
}
