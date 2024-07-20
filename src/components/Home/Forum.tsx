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
            }} key={forum.id} className="p-4 bg-teal-500 shadow-lg text-center hover:shadow-blue-200 hover:cursor-pointer">
                <h1 className="text-lg font-bold text-gray-800">{forum.name}</h1>
                <p className="text-gray-700 text-sm">{forum.description}</p>
            </div>
        </>
    )
}

export default Forum
