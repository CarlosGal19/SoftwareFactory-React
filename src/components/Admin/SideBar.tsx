import { FC } from "react";
import { Link, useLocation  } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SideBar: FC = () => {

    const { logout } = useAuth();
    const location = useLocation();

    const getLinkClasses = (path: string) => {
        const baseClasses = "block text-lg p-2 rounded";
        const activeClasses = "bg-gray-900";
        const inactiveClasses = "hover:bg-gray-700";
        return location.pathname === path ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
    };

    return (
        <div className="w-1/5 bg-gray-800 text-white p-6 flex flex-col">
            <div className="flex items-center justify-center mb-8">
                <Link to="/admin/home">
                    <img src="/UTMA.png" alt="UTMA Logo" className="w-32 h-auto" />
                </Link>
            </div>
            <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
            <ul className="space-y-4 flex-grow">
                <li>
                    <Link to="/admin/manage-forums" className={getLinkClasses("/admin/manage-forums")}>
                        Manage Forums
                    </Link>
                </li>
                <li>
                    <Link to="/admin/manage-topics" className={getLinkClasses("/admin/manage-topics")}>
                        Manage Topics
                    </Link>
                </li>
                <li>
                    <Link to="/admin/validate-posts" className={getLinkClasses("/admin/validate-posts")}>
                        Validate Posts
                    </Link>
                </li>
                <li>
                    <Link to="/admin/manage-admins" className={getLinkClasses("/admin/manage-admins")}>
                        Manage Admins
                    </Link>
                </li>
                <li>
                    <Link to="/admin/manage-roles" className={getLinkClasses("/admin/manage-roles")}>
                        Manage Roles
                    </Link>
                </li>
            </ul>
            <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full" onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default SideBar;
