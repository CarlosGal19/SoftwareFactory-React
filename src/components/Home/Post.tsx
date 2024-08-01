import { FC, useState } from "react";
import PostCreator from "./PostCreator";
import EditPostForm from "./EditPostForm";

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

type PostProps = {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
};

const Post: FC<PostProps> = ({ post, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

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

    return (
        <li key={post.id} className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center w-5/6 m-auto list-none">
            {isEditing ? (
                <EditPostForm post={post} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <>
                    <PostCreator id={post.creator_id} />
                    <h2 className="text-4xl font-bold my-4">{post.title}</h2>
                    <h3 className="text-2xl my-2">{post.content}</h3>
                    {post.url_img && <img src={post.url_img} alt="Post Image" className="m-auto max-h-64 object-cover" />}
                    <h3 className="text-xl font-semibold my-2 text-left">{post.created_at}</h3>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                        <button onClick={() => onDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default Post;
