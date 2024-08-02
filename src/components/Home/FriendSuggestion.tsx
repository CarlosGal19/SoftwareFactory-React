import axiosClient from "../../config/axios";
import { FC, useEffect, useState } from "react";
import Friend from "./Friend";

type User = {
  id: number;
  name: string;
  last_name: string;
  profile_photo: string;
};

const FriendSuggestion: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get('/friends/me/not', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUsers(response.data.notFriends);
        console.log(response.data.notFriends);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [jwt]);

  return (
    <div className="mt-16 w-full md:w-1/6 bg-sky-800 shadow-lg p-6 overflow-y-auto">
        <h1 className="text-center text-3xl font-bold text-slate-300 mb-6">Friend Suggestions</h1>
        <div className="space-y-4 text-slate-300">
            {users.map((user) => (
                <Friend key={user.id} friend={user} />
            ))}
        </div>
    </div>
);

};

export default FriendSuggestion;
