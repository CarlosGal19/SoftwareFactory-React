import { FC } from "react"

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

// const request:FC <{(request: requestRequest)}>  = ({request}) => {

const request: FC<{ request: requestRequest }> = ({ request }) => {

  return (
    <li className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex items-center">
            <img
                className="w-16 h-16 rounded-full"
                src={request.sender.profile_photo}
                alt="Profile"
            />
            <div className="ml-4">
                <h3 className="text-lg font-semibold">
                    {request.sender.name} {request.sender.last_name}
                </h3>
                <p className="text-gray-500">@{request.sender.user_name}</p>
            </div>
        </div>
        <div className="flex items-center mr-8">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4">
                Accept
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Reject
            </button>
        </div>
    </li>
  )
}

export default request
