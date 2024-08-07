import { FC, useState, useEffect } from "react";
import ReactionButton from "./ReactionButton";

type Post = {
    id: number;
    topic_id: number;
    creator_id: number;
    title: string;
    content: string;
    url_img: string;
    created_at: string;
    updated_at: string;
};

type Comment = {
    id: number;
    user: string;
    content: string;
};

type ModalProps = {
    onClose: () => void;
    post: Post;
    comments: Comment[];
    reactions: { [key: string]: number };
    onAddComment: (content: string) => void;
    onReact: (reactionType: string) => void;
};

const Modal: FC<ModalProps> = ({ onClose, post, comments, reactions, onAddComment, onReact }) => {
    const [commentText, setCommentText] = useState("");
    const [userReaction, setUserReaction] = useState<string | null>(null);

    // Load user reaction from localStorage on mount
    useEffect(() => {
        const savedReaction = localStorage.getItem(`reaction_${post.id}`);
        if (savedReaction) {
            setUserReaction(savedReaction);
        }
    }, [post.id]);

    const handleAddComment = () => {
        if (commentText.trim()) {
            onAddComment(commentText);
            setCommentText("");
        }
    };

    const handleReaction = (reactionType: string) => {
        if (userReaction === reactionType) {
            // Remove reaction if already selected
            setUserReaction(null);
            onReact(""); // Optionally pass empty string or appropriate value
            localStorage.removeItem(`reaction_${post.id}`);
        } else {
            // Remove previous reaction if any
            if (userReaction) {
                onReact(""); // Optionally pass empty string or appropriate value
            }
            // Set new reaction
            setUserReaction(reactionType);
            onReact(reactionType);
            localStorage.setItem(`reaction_${post.id}`, reactionType);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-xl p-4 w-2/3 h-4/5 flex overflow-hidden">
                <div className="w-2/3 p-4 overflow-y-auto grid grid-cols-1 gap-4 place-content-evenly text-center">
                    <section>
                        <h2 className="text-3xl font-bold my-4 text-gray-800">{post.title}</h2>
                        <h3 className="text-xl my-4 text-gray-600">{post.content}</h3>
                        {post.url_img && <img src={post.url_img} alt="Post Image" className="m-auto h- object-cover rounded-md shadow-md" />}
                        
                        <div className="mt-4">
                            <div className="flex justify-center space-x-2 mt-2">
                                <ReactionButton 
                                    src="../Like.svg" 
                                    reactionType="like" 
                                    count={reactions.like} 
                                    onReact={() => handleReaction("like")} 
                                    isActive={userReaction === "like"} 
                                />
                                <ReactionButton 
                                    src="../Laugh.svg" 
                                    reactionType="jaja" 
                                    count={reactions.haha} 
                                    onReact={() => handleReaction("jaja")} 
                                    isActive={userReaction === "jaja"} 
                                />
                                <ReactionButton 
                                    src="../Surprised.svg" 
                                    reactionType="wow" 
                                    count={reactions.wow} 
                                    onReact={() => handleReaction("wow")} 
                                    isActive={userReaction === "wow"} 
                                />
                                <ReactionButton 
                                    src="../Sad.svg" 
                                    reactionType="sad" 
                                    count={reactions.sad} 
                                    onReact={() => handleReaction("sad")} 
                                    isActive={userReaction === "sad"} 
                                />
                                <ReactionButton 
                                    src="../Angry.svg" 
                                    reactionType="angry" 
                                    count={reactions.angry} 
                                    onReact={() => handleReaction("angry")} 
                                    isActive={userReaction === "angry"} 
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="w-1/3 p-4 border-l border-gray-200 flex flex-col justify-between">
                    <button onClick={onClose} className="text-black font-bold text-s mb-4 self-end">Close</button>
                    <div className="overflow-y-auto flex-grow">
                        <h4 className="text-2xl font-bold text-gray-800 mb-4">Comentarios</h4>
                        <div>
                            {comments.map(comment => (
                                <div key={comment.id} className="mb-2 p-2 border-b border-gray-200">
                                    <strong>{comment.user}</strong>: {comment.content}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <textarea 
                            className="w-full p-2 border border-gray-300 rounded-md flex-grow" 
                            placeholder="Agregar un comentario..." 
                            value={commentText} 
                            onChange={(e) => setCommentText(e.target.value)} 
                        />
                        <button 
                            onClick={handleAddComment} 
                            className="ml-1 bg-sky-800 text-white text-s px-2 py-1 rounded-md hover:bg-sky-600 transition duration-200"
                        >
                            Comentar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
