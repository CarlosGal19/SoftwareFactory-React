import axiosClient from "../../config/axios"
import Friend from "../../components/FriendRequests/Friend";

import { FC, useState, useEffect } from "react";

type FriendRequest = {
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

const FriendRequests: FC = () => {

  const [requests, setRequests] = useState([]);

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosClient.get('/friend-requests', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log(response.data.friendRequests);
        setRequests(response.data.friendRequests);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchRequests();
  }, [jwt]);

  return (
    <>
      <div className="py-32 w-3/4 m-auto">
        <h2 className="text-6xl font-bold">Friend Requests</h2>
        <ul className="w-full shadow-lg py-8 pl-8">
          {requests.map((request: FriendRequest) => (
            <Friend key={request.id} request={request} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default FriendRequests
