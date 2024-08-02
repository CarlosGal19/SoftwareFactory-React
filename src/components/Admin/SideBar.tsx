import { FC } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SideBar: FC = () => {

    const { logout } = useAuth();

    return (
        <div className="w-1/5 h-screen bg-gray-800 text-white p-6 flex flex-col">
            <div className="flex items-center justify-center mb-8">
                <img src="/UTMA.png" alt="UTMA Logo" className="w-32 h-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
            <ul className="space-y-4 flex-grow">
                <li>
                    <Link
                        to="/admin/create-forum"
                        className="block text-lg hover:bg-gray-700 p-2 rounded"
                    >
                        Create Forum
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/create-topic"
                        className="block text-lg hover:bg-gray-700 p-2 rounded"
                    >
                        Create Topic
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/validate-posts"
                        className="block text-lg hover:bg-gray-700 p-2 rounded"
                    >
                        Validate Posts
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/manage-admins"
                        className="block text-lg hover:bg-gray-700 p-2 rounded"
                    >
                        Manage Admins
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/manage-roles"
                        className="block text-lg hover:bg-gray-700 p-2 rounded"
                    >
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
