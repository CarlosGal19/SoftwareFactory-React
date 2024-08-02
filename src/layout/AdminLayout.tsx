import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SideBar from "../components/Admin/SideBar";

const AdminLayout = () => {
    const { isAuth } = useAuth();

    return isAuth ? (
        <div className="flex">
            <SideBar />
            <Outlet />
        </ div>
    ) : (
        <Navigate to="/" />
    );
};

export default AdminLayout;
