import { Route, Routes } from "react-router"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Register } from "./components/Register"

export const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  )
}
