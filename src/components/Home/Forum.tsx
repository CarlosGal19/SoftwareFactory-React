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
        <div
            onClick={() => navigate(`/forum/${forum.id}`)}
            key={forum.id}
            className="m-2 p-4 bg-sky-700 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
        >
            <h1 className="text-lg font-semibold text-slate-300">{forum.name}</h1>
        </div>
    );
}

export default Forum
