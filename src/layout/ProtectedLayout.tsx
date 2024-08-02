import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Static/Header";
import Footer from "../components/Static/Footer";

const ProtectedRoute = () => {
    const { isAuth, loading } = useAuth();

    return isAuth ? (
        <>
            <Header />
            {
                loading ? (
                    <h2>Cargando...</h2>
                ) : (
                    <Outlet />
                )
            }
            <Footer />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
