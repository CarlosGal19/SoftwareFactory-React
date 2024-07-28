import { FC } from "react"
import { useNavigate } from "react-router-dom"


type Topic = {
    id: number;
    name: string;
    description: string;
    forum_id: number;
    creator_id: number;
    created_at: string;
    updated_at: string;
}

const Topic: FC<{ topic: Topic }> = ({ topic }) => {

    const navigate = useNavigate();

    return (
        <>
            <div key={topic.id} className="bg-gray-100 p-3 my-4 rounded-xl hover:shadow-sky-300 hover:cursor-pointer shadow-xl" onClick={() => {
                navigate(`/topic/${topic.name}/${topic.id}`)
            }}>
                <h2 className="text-2xl font-bold text-gray-800">{topic.name}</h2>
                <p className="text-gray-700">{topic.description}</p>
            </div>
        </>
    )
}

export default Topic
