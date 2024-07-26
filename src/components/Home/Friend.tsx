import { FC } from "react";

type User = {
    id: number;
    name: string;
    last_name: string;
    profile_photo: string;
};

const Friend: FC<{ friend: User }> = ({ friend }) => {
    return (
        <div className="flex justify-between items-center">

            <div className='flex items-center p-2 m-auto'>
                <img src={friend.profile_photo} alt={friend.name} className='w-12 h-12 rounded-full' />
                <p className='ml-4 font-semibold text-sm'>{friend.name} {friend.last_name}</p>
            </div>
            <div className="mr-4">
                <img src="/user_add.svg" alt="Add Friend" className='ml-4 w-6 h-6' /> {/* Usa la URL del SVG */}
            </div>
        </div>
    );
};

export default Friend;
