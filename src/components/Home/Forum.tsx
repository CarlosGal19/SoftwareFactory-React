import { FC } from "react"
import { useNavigate } from "react-router-dom"

type OneForum = {
    id: number;
    name: string;
    description: string;
    creator_id: number;
    created_at: string;
    updated_at: string;
}

const Forum: FC<{ forum: OneForum }> = ({ forum }) => {

    const navigate = useNavigate();

    return (
        <>
            <div onClick={() => {
                navigate(`/forum/${forum.id}`)
            }} key={forum.id} className="m-2 p-4 bg-teal-500 shadow-lg text-center hover:shadow-blue-50 hover:cursor-pointer">
                <h1 className="text-sm font-arial text-gray-800">{forum.name}</h1>
            </div>
        </>
    )
}

export default Forum
