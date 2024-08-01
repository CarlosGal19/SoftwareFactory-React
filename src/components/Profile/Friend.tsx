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
    <div className="flex flex-col items-center shadow-sm rounded-lg p-2 bg-white">
      <img
        src={friend.profile_photo || './user.svg'}
        alt={`${friend.name} ${friend.last_name}'s profile`}
        className="w-16 h-16 rounded-full object-cover mb-2 shadow-sm"
      />
      <h2 className="text-center text-lg font-bold text-gray-800">
        {friend.name} {friend.last_name}
      </h2>
      <p className="text-sm text-gray-600">@{friend.user_name}</p>
      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
        View Profile
      </button>
    </div>
  );
};

export default Friend;
