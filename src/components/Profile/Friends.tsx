import { FC, useState, useEffect } from "react";
import Friend from "../Profile/Friend";
import axiosClient from "../../config/axios";

type FriendType = {
  id: number;
  name: string;
  last_name: string;
  profile_photo: string;
  user_name: string;
};

const Friends: FC = () => {
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosClient.get('friends/me/all', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setFriends(response.data.friends);
      } catch (error: any) {
        console.error(error.response.data.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, [jwt]);

  return (
    <div className="mt-16 w-auto hidden md:block">
      <h1 className='text-center font-bold text-4xl mt-4'>Friends List</h1>
      {loading ? (
        <p className="text-center mt-4">Loading friends...</p>
      ) : friends.length === 0 ? (
        <p className='text-center mt-4'>You don't have friends yet</p>
      ) : (
        <div className="shadow-xl w-5/6 m-auto grid md:grid-cols-3 gap-8">
          {friends.map(friend => (
            <Friend key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
