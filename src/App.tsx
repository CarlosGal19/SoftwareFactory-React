import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from './pages/Login/Login.tsx';
import Register from './pages/Login/Register';
import ForgetPassword from './pages/Login/ForgetPassword';
import NewPassword from './pages/Login/NewPassword';
import ConfirmAccount from './pages/Login/ConfirmAccount';
import { MajorProvider } from "./context/MajorProvider.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import Home from './pages/Protect/Home';
import ProtectedRoute from './layout/ProtectedLayout.tsx';
import Profile from './pages/Protect/Profile';
import Settings from './pages/Protect/Settings'
import Forum from "./pages/Protect/Forum";
import Topic from "./pages/Protect/Topic";

function App() {

  return (
    <>
      <AuthProvider>
        <MajorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthLayout />} >
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forget-password' element={<ForgetPassword />} />
                <Route path='forget-password/:token' element={<NewPassword />} />
                <Route path='confirm-account/:id' element={<ConfirmAccount />} />
              </Route>
              <Route path="/home" element={<ProtectedRoute />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="/profile" element={<ProtectedRoute />}>
                <Route index element={<Profile />} />
              </Route>
              <Route path="/settings" element={<ProtectedRoute />}>
                <Route index element={<Settings />} />
              </Route>
              <Route path="/forum/:id" element={<ProtectedRoute />}>
                <Route index element={<Forum />} />
              </Route>
              <Route path="/topic/:id" element={<ProtectedRoute />}>
                <Route index element={<Topic />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MajorProvider>
      </AuthProvider>
    </>
  )
}

export default App;
