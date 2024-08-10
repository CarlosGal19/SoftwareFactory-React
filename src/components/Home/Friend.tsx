import { FC } from "react";
import axiosClient from "../../config/axios";
import { UserType } from "../../Types/Types";

const Friend: FC<{ friend: UserType }> = ({ friend }) => {

  const jwt = localStorage.getItem('jwt');

  const handleClick = async () => {
    try {
      const response = await axiosClient.post(`/friend-requests/${friend.id}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 space-x-3">
      <img
        src={friend.profile_photo || './user.svg'}
        alt={`${friend.name} ${friend.last_name}`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-grow">
        <h2 className="text-sm font-semibold text-gray-800 truncate">
          {friend.name} {friend.last_name}
        </h2>
        <p className="text-xs text-gray-500">@{friend.user_name}</p>
      </div>
      <button
        className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
        onClick={handleClick}
      >
        <img src="/user_add.svg" alt="Add Friend" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Friend;
