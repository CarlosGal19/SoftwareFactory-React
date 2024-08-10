import { FC } from "react"
import axiosClient from "../../config/axios"
import useAuth from "../../hooks/useAuth";

type requestRequest = {
    id: number;
    receiver_id: number;
    status: string;
    sender: {
        id: number;
        name: string;
        last_name: string;
        user_name: string;
        profile_photo: string;
    }
    created_at: string;
    updated_at: string;
}

const Friend: FC<{ request: requestRequest }> = ({ request }) => {

    const { jwt } = useAuth();

    const handleClick = async (e: any) => {
        const status = e.target.value;
        try {
            const response = await axiosClient.patch('/friend-requests/', {
                sender_id: request.sender.id,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log(response.data.message);
        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }

    return (
        <li className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center space-x-4">
                <img
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                    src={request.sender.profile_photo || './user.svg'}
                    alt={`${request.sender.name} ${request.sender.last_name}'s profile`}
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {request.sender.name} {request.sender.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">@{request.sender.user_name}</p>
                </div>
            </div>
            <div className="flex space-x-4">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={handleClick}
                    value="accepted"
                >
                    Accept
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    onClick={handleClick}
                    value="rejected"
                >
                    Reject
                </button>
            </div>
        </li>
    );

}

export default Friend
