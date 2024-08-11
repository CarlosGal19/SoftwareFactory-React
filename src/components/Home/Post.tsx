import { FC, useState } from "react";
import EditPostForm from "./EditPostForm";
import ReactionButton from "./ReactionButton";
import Modal from "./Modal";

type Post = {
    id: number;
    topic_id: number;
    creator: {
        name: string;
        last_name: string;
    },
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

type PostProps = {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
};

const Post: FC<PostProps> = ({ post, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [reactions, setReactions] = useState<{ [key: string]: number }>({ like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 });
    const [comments, setComments] = useState<Comment[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        onEdit(post);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleReaction = (reactionType: string) => {
        setReactions((prevReactions) => ({
            ...prevReactions,
            [reactionType]: (prevReactions[reactionType] || 0) + 1
        }));
    };

    const handleShowMoreComments = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const topComments = comments.slice(0, 3);

    return (
        <li key={post.id} className="p-3 bg-white shadow-xl rounded-lg text-center w-12/12 md:w-3/4 m-auto list-none border border-gray-200">
            {isEditing ? (
                <EditPostForm post={post} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <>
                    <div className="flex space-x-2 place-content-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-500 font-bold">{post.creator.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-700">{`${post.creator.name} ${post.creator.last_name}`}</h2>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={handleEdit} className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-sky-600 transition duration-200">Edit</button>
                            <button onClick={() => onDelete(post.id)} className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"><img src="../bin.svg" /></button>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold my-4 text-gray-800">{post.title}</h2>
                    <h3 className="text-xl my-4 text-gray-600">{post.content}</h3>
                    {post.url_img && <img src={post.url_img} alt="Post Image" className="m-auto max-h-64 object-cover rounded-md shadow-md" />}
                    <div className="flex justify-between mt-4">
                        <div className="flex space-x-2">
                            <ReactionButton src="../like.svg" reactionType="like" count={reactions.like} onReact={() => handleReaction("like")} />
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={handleShowMoreComments} className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-sky-600 transition duration-200">Comments</button>
                        </div>
                    </div>
                    <div className="mt-4 text-left">
                        {topComments.map(comment => (
                            <div key={comment.id} className="mb-2">
                                <strong>{comment.user}</strong>: {comment.content}
                            </div>
                        ))}
                    </div>
                    {comments.length > 3 && (
                        <button onClick={handleShowMoreComments} className="text-blue-500 mt-2 hover:underline">Ver más</button>
                    )}
                </>
            )}
            {showModal && <Modal onClose={handleCloseModal} post={post} comments={comments} reactions={reactions} onAddComment={function (content: string): void {
                throw new Error("Function not implemented.");
            }} />}
        </li>
    );
};

export default Post;
