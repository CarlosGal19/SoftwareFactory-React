import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Link
                to="/admin/manage-forums"
                className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105"
            >
                <h2 className="text-xl font-semibold mb-4">Manage Forums</h2>
                <p className="text-gray-700">Create, update, and delete forums.</p>
            </Link>
            <Link
                to="/admin/manage-topics"
                className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105"
            >
                <h2 className="text-xl font-semibold mb-4">Manage Topics</h2>
                <p className="text-gray-700">Oversee discussions, merge topics, and manage threads.</p>
            </Link>
            <Link
                to="/admin/validate-posts"
                className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105"
            >
                <h2 className="text-xl font-semibold mb-4">Validate Posts</h2>
                <p className="text-gray-700">Approve or reject posts submitted by users.</p>
            </Link>
            <Link
                to="/admin/manage-admins"
                className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105"
            >
                <h2 className="text-xl font-semibold mb-4">Manage Admins</h2>
                <p className="text-gray-700">Add, remove, and update admin privileges.</p>
            </Link>
            <Link
                to="/admin/manage-roles"
                className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105"
            >
                <h2 className="text-xl font-semibold mb-4">Manage Roles</h2>
                <p className="text-gray-700">Define and assign roles to users and admins.</p>
            </Link>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Forums</p>
                    <p className="text-2xl">12</p>
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Topics</p>
                    <p className="text-2xl">345</p>
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Pending Posts</p>
                    <p className="text-2xl">23</p>
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Admins</p>
                    <p className="text-2xl">4</p>
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Roles</p>
                    <p className="text-2xl">6</p>
                </div>
            </div>
        </div>
    </div>
);
}

export default Home
