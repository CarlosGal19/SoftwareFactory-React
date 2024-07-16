import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="container mx-auto flex items-center justify-center min-h-screen p-5">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
