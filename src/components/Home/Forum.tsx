import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { ForumType } from "../../Types/Types";

const Forum: FC<{ forum: ForumType }> = ({ forum }) => {

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
