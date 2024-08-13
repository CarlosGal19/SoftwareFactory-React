import { FC } from "react";

type OnePost = {
    id: number;
    title: string;
    content: string;
    topic_id: number;
    creator: {
        name: string;
        last_name: string;
    };
    url_img: string;
    created_at: string;
    updated_at: string;
};

interface PostProps {
    post: OnePost;
    onEdit: (post: OnePost) => void;
    onDelete: (postId: number) => void;
}

const Post: FC<PostProps> = ({ post, onEdit, onDelete }) => {

    return (
        <div key={post.id} className="bg-white p-6 my-4 rounded-lg shadow-md w-full max-w-2xl mx-auto border-t-4 border-sky-500 transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h2>
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 font-bold">{post.creator.name.charAt(0)}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">{`${post.creator.name} ${post.creator.last_name}`}</h2>
                </div>
                <p>
                    {new Date(post.created_at).toLocaleDateString()}
                    {post.updated_at !== post.created_at && (
                        <span className="ml-2">(Updated: {new Date(post.updated_at).toLocaleDateString()})</span>
                    )}
                </p>
            </div>
            <p className="text-gray-700 mb-4 text-base">{post.content}</p>
            {post.url_img && (
                <img src={post.url_img} alt="Post Image" className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm" />
            )}
            <div className="flex justify-end space-x-3 mt-4">
                <button
                    onClick={() => onEdit(post)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(post.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
                >
                    Delete
                </button>
            </div>
        </div>
    );

};

export default Post;
