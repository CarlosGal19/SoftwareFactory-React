import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SideBar from "../components/Admin/SideBar";

const AdminLayout = () => {
    const { isAuth, loading } = useAuth();

    return isAuth ? (
        <div className="flex">
            <SideBar />
            {
                loading ? (
                    <h2>Cargando...</h2>
                ) : (
                    <Outlet />
                )
            }
        </ div>
    ) : (
        <Navigate to="/" />
    );
};

export default AdminLayout;
