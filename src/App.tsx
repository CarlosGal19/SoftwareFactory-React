import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from './pages/Login/Login.tsx';
import Register from './pages/Login/Register';
import ForgetPassword from './pages/Login/ForgetPassword';
import NewPassword from './pages/Login/NewPassword';
import ConfirmAccount from './pages/Login/ConfirmAccount';
import { AuthProvider } from "./context/AuthProvider.tsx";
import Home from './pages/Protect/Home';
import ProtectedRoute from './layout/ProtectedLayout.tsx';
import Profile from './pages/Protect/Profile';
import Settings from './pages/Protect/Settings'
import Forum from "./pages/Protect/Forum";
import Topic from "./pages/Protect/Topic";
import Chats from "./pages/Protect/Chats";
import FriendRequests from "./pages/Protect/FriendRequests";

import AdminLogin from "./pages/Admin/Login"
import AdminHome from "./pages/Admin/Home"
import AdminLayout from "./layout/AdminLayout";
import AdminForums from "./pages/Admin/Forums.tsx";
import AdminTopics from "./pages/Admin/Topics.tsx";
import AdminPosts from "./pages/Admin/Posts.tsx";

import CreateForum from "./pages/Admin/CreateForum.tsx";
import CreateAdmin from "./pages/Admin/CreateAdmin.tsx";
import CreateTopic from "./pages/Admin/CreateTopic.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
          <AuthProvider>
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
              <Route path="/chats" element={<ProtectedRoute />}>
                <Route index element={<Chats />} />
              </Route>
              <Route path="/friend-requests" element={<ProtectedRoute />}>
                <Route index element={<FriendRequests />} />
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
              <Route path="/topic/:name/:id" element={<ProtectedRoute />}>
                <Route index element={<Topic />} />
              </Route>
              <Route path="/admin" element={<AuthLayout />}>
                <Route index element={<AdminLogin />} />
              </Route>
              <Route path="/admin/home" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
              </Route>
              <Route path="/admin/manage-forums" element={<AdminLayout />}>
                <Route index element={<AdminForums />} />
              </Route>
              <Route path="/admin/manage-topics" element={<AdminLayout />}>
                <Route index element={<AdminTopics />} />
              </Route>
              <Route path="/admin/validate-posts" element={<AdminLayout />}>
                <Route index element={<AdminPosts />} />
              </Route>
              <Route path="/admin/manage-admins" element={<AdminLayout />}>
                <Route index element={<CreateAdmin />} />
              </Route>
              <Route path="/admin/create-forum" element={<AdminLayout />}>
                <Route index element={<CreateForum />} />
              </Route>
              <Route path="admin/create-topic" element={<AdminLayout />}>
                <Route index element={<CreateTopic />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App;
