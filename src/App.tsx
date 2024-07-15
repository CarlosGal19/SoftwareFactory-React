import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from './pages/Login/Login.tsx'
import Register from './pages/Login/Register'
import ForgetPassword from './pages/Login/ForgetPassword'
import NewPassword from './pages/Login/NewPassword'
import ConfirmAccount from './pages/Login/ConfirmAccount'
import { MajorProvider } from "./context/MajorProvider.tsx"
import { AuthProvider } from "./context/AuthProvider.tsx"
import HomeLayout from './layout/AuthLayout'
import Home from './pages/Protect/Home'

function App() {

  return (
    <>
      <AuthProvider>
          <MajorProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />} >
                  <Route index element={<Login/>}/>
                  <Route path='register' element={<Register/>} />
                  <Route path='forget-password' element={<ForgetPassword/>} />
                  <Route path='forget-password/:token' element={<NewPassword/>} />
                  <Route path='confirm-account/:id' element={<ConfirmAccount/>} />
                </Route>
                <Route path="/home" element={<HomeLayout />}>
                  <Route index element={<Home />} />
                </Route>
            </Routes>
          </BrowserRouter>
        </MajorProvider>
      </AuthProvider>
    </>
  )
}

export default App
