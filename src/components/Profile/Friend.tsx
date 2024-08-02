import { FC } from "react";

type Friend = {
  id: number;
  name: string;
  last_name: string;
  profile_photo: string;
  user_name: string;
};

const Friend: FC<{ friend: Friend }> = ({ friend }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
      <img
        src={friend.profile_photo || './user.svg'}
        alt={`${friend.name} ${friend.last_name}'s profile`}
        className="w-20 h-20 rounded-full object-cover mb-4 border border-gray-200"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {friend.name} {friend.last_name}
      </h2>
      <p className="text-sm text-gray-600 mb-2">@{friend.user_name}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm">
        View Profile
      </button>
    </div>
  );

};

export default Friend;
