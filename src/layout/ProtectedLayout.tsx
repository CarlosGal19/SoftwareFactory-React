import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
