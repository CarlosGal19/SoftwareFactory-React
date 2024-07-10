import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from './pages/Login.tsx'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import { MajorProvider } from "./context/MajorProvider.tsx"
import { AuthProvider } from "./context/AuthProvider.tsx"

function App() {

  return (
    <>
      <AuthProvider>
          <BrowserRouter>
            <Routes>
              <MajorProvider>
                <Route path="/" element={<AuthLayout />} >
                  <Route index element={<Login/>}/>
                  <Route path='register' element={<Register/>} />
                  <Route path='forget-password' element={<ForgetPassword/>} />
                  <Route path='forget-password/:token' element={<NewPassword/>} />
                  <Route path='confirm-account/:id' element={<ConfirmAccount/>} />
                </Route>
              </MajorProvider>
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
