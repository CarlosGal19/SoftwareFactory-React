import axiosClient from "../../config/axios"
import { FC, useEffect, useState } from "react"
import Friend from "./Friend"

type User = {
  id: number
  name: string
  last_name: string,
  profile_photo: string
}

const FriendSuggestion: FC = () => {

  const [users, setUsers] = useState<User[]>([])
  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get('/friends/me/not', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        setUsers(response.data.notFriends)
        console.log(response.data.notFriends)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [jwt]);

  return (
    <div className="mt-16 w-1/6 hidden md:block bg-teal-500">
      <h1 className='text-center font-bold text-4xl mt-4'>Friend Suggestions</h1>
      <div className="mt-6">
        {
          users.map((user) => (
            <Friend key={user.id} friend={user} />
          ))
        }
      </div>
    </div>
  )
}

export default FriendSuggestion
