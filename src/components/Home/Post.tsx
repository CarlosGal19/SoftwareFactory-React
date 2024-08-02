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
        <li key={post.id} className="mt-6 p-6 bg-white shadow-xl rounded-lg text-center w-11/12 md:w-3/4 m-auto list-none border border-gray-200">
            {isEditing ? (
                <EditPostForm post={post} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <>
                    <PostCreator id={post.creator_id} />
                    <h2 className="text-3xl font-bold my-4 text-gray-800">{post.title}</h2>
                    <h3 className="text-xl my-4 text-gray-600">{post.content}</h3>
                    {post.url_img && <img src={post.url_img} alt="Post Image" className="m-auto max-h-64 object-cover rounded-md shadow-md" />}
                    <h3 className="text-lg font-medium my-4 text-gray-500 text-left">{new Date(post.created_at).toLocaleDateString()}</h3>
                    <div className="flex justify-end mt-4 space-x-4">
                        <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200">Edit</button>
                        <button onClick={() => onDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">Delete</button>
                    </div>
                </>
            )}
        </li>
    );

};

export default Post;
