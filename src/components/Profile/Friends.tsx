import { FC, useState, useEffect } from "react"
import Friend from "./Friend"
import axiosClient from "../../config/axios"

type Friend = {
  id: number,
  name: string,
  last_name: string,
  profile_photo: string,
  user_name: string,
}

const Friends: FC = () => {

  const [friends, setFriends] = useState<Friend[]>([]);

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
        console.log(error.response.data.message || 'An error occurred');
      }
    }
    fetchFriends();
  }, [jwt]);

  return (
    <>
      <div className="mt-16 w-auto hidden md:block">
        <h1 className='text-center font-bold text-4xl mt-4'>Friends list</h1>
        <div className="shadow-xl w-5/6 m-auto grid md:grid-cols-3 gap-8">
          {
            friends.map(friend => (
              <Friend key={friend.id} friend={friend} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Friends
