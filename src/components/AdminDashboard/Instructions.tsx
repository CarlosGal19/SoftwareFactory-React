import { Link } from "react-router-dom"

const Instructions = () => {
    return (
        <>
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
            </div>
        </>
    )
}

export default Instructions
