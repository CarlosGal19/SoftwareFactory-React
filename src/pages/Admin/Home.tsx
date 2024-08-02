import { FC } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Admin/SideBar";

const Home: FC = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-4/5 p-6">
        <Outlet />
        <h2 className="text-4xl font-bold mb-8">Admin Actions</h2>
      </div>
    </div>
  );
}

export default Home
