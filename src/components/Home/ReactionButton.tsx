import { FC } from "react";

type ReactionButtonProps = {
    src: string;
    reactionType: string;
    count: number;
    onReact: () => void;
    isActive: boolean;
};

const ReactionButton: FC<ReactionButtonProps> = ({ src, reactionType, count, onReact, isActive }) => {
    return (
        <button 
            onClick={onReact} 
            className={`flex items-center space-x-1 p-2 ${isActive ? "bg-blue-200" : ""}`}
        >
            <img src={src} alt={reactionType} className="w-6 h-6" />
            <span>{count}</span>
        </button>
    );
};

export default ReactionButton;
