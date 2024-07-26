import { FC } from "react";

type User = {
    id: number
    name: string
    last_name: string,
    profile_photo: string
  }

const Friend: FC<{ friend : User}> = ({friend}) => {
    return (
        <>
            <div className='flex items-center p-2'>
                <img src={friend.profile_photo} alt={friend.name} className='w-12 h-12 rounded-full' />
                <p className='ml-4'>{friend.name} {friend.last_name}</p>
            </div>
        </>
    )
}

export default Friend
