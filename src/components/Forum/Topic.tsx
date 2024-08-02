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
        <div
            key={topic.id}
            className="bg-white p-4 mb-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                navigate(`/topic/${topic.name}/${topic.id}`);
            }}
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h2>
            <p className="text-gray-600 text-sm">{topic.description}</p>
        </div>
    );
}

export default Topic
