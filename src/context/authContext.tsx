import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

interface Props {
  children: React.ReactNode
}

interface AuthContext {
  signUp: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  user: User | null
  logout: () => Promise<void>
  loading: boolean
}

const authContext = createContext<AuthContext | null>(null)

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  useEffect(() => {
   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      unSubscribe()
    }
  }, [])

  return (
    <authContext.Provider value={{ signUp, login, user, logout, loading }}>
      {children}
    </authContext.Provider>
  )
}
