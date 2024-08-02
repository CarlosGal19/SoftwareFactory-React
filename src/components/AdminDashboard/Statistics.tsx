
const Statistics = () => {
    return (
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
    )
}

export default Statistics
