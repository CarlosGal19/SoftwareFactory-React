import { FC } from "react"
import Forums from "./Statistics/Forums"
import Topics from "./Statistics/Topics"
import PendingPosts from "./Statistics/PendingPosts"
import Admins from "./Statistics/Admins"
import Roles from "./Statistics/Roles"

const Statistics: FC = () => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Forums</p>
                    <Forums />
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Topics</p>
                    <Topics />
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Pending Posts</p>
                    <PendingPosts />
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Admins</p>
                    <Admins />
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-lg font-bold">Roles</p>
                    <Roles />
                </div>
            </div>
        </div>
    )
}

export default Statistics
