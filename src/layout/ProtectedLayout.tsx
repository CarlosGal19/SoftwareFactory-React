import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Static/Header";
import Footer from "../components/Static/Footer";

const ProtectedRoute = () => {
    const { isAuth, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // O cualquier componente de carga que desees
    }

    return isAuth ? (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
