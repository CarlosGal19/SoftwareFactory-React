import { FC, useState, useEffect } from "react";
import Friend from "../Profile/Friend";
import axiosClient from "../../config/axios";
import { AlertType, UserType } from "../../Types/Types";
import useAuth from "../../hooks/useAuth";
import Alert from "../Static/Alert";

const Friends: FC = () => {
  const [friends, setFriends] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<AlertType>({} as AlertType);
  const { jwt } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosClient.get('friends/me/all', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setFriends(response.data.friends);
        setAlert({ message: response.data.message, type: 'success' })
      } catch (error: any) {
        setAlert({ message: error.response.data.message, type: 'alert' })
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, [jwt]);

  return (
    <div className="mt-16 w-full max-w-6xl mx-auto px-4">
      {
        alert.message && <Alert alert={alert} />
      }
      <h1 className="text-center font-bold text-4xl mb-6 text-gray-800">Friends List</h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading friends...</p>
      ) : friends.length === 0 ? (
        <p className="text-center text-lg text-gray-600">You don't have friends yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {friends.map(friend => (
            <Friend key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );

};

export default Friends;
