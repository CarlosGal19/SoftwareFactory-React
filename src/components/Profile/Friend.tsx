import { FC } from "react"

type Friend = {
  id: number,
  name: string,
  last_name: string,
  profile_photo: string,
  user_name: string,
}

const Friend: FC<({friend: Friend})> = ({friend}) => {
  return (
    <>
      <div className="flex flex-col items-center shadow-md rounded-lg p-4">
        <img src={friend.profile_photo || './user.svg'} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4 shadow-md" />
        <h2 className="text-center text-xl font-bold text-gray-800">{friend.name} {friend.last_name}</h2>
        <p className="my-2"> {friend.user_name}</p>
      </div>
    </>
  )
}

export default Friend
