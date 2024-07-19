import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Static/Header";
import Footer from "../components/Static/Footer";

const ProtectedRoute = () => {
    const { isAuth } = useAuth();

    return isAuth ? (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;
