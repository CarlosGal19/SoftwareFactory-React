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
    <div className="flex flex-col min-h-screen py-16 px-4 bg-gray-100 my-16">
        <main className="flex-grow w-full max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Friend Requests</h2>
            <ul className="bg-white shadow-lg rounded-lg border border-gray-200 divide-y divide-gray-200">
              {
                requests.length === 0 ? (
                  <p className="text-center text-lg text-gray-600 py-4">No friend requests</p>
                ) : (
                  requests.map((request: FriendRequest) => (
                    <Friend key={request.id} request={request} />
                  ))
                )
              }
            </ul>
        </main>
    </div>
);


}

export default FriendRequests
