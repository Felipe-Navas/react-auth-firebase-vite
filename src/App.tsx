import { Route, Routes } from 'react-router'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { AuthProvider } from './context/authContext'

export const App = () => {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}
