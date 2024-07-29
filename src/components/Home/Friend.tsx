import { FC, useState } from "react";
import axiosClient from "../../config/axios";

type User = {
  id: number;
  name: string;
  last_name: string;
  profile_photo: string;
};

const Friend: FC<{ friend: User }> = ({ friend }) => {

  const [sent, setSent] = useState<boolean>(false);

  const jwt = localStorage.getItem('jwt');

  const handleClick = async () => {
    try {
      const response = await axiosClient.post(`/friend-requests/${friend.id}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      setSent(true);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex items-center rounded-lg hover:shadow-md transition-shadow duration-200 space-x-4">
      <img src={friend.profile_photo} alt={`${friend.name} ${friend.last_name}`} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-grow">
        <h2 className="text-m font-semibold text-slate-300">{friend.name} {friend.last_name}</h2>
      </div>
      <button className="bg-blue-500 text-slate-300 px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200" onClick={handleClick}>
        <img src="/user_add.svg" alt="Add Friend" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Friend;
