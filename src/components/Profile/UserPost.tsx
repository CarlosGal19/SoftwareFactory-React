import { FC, useState } from "react";
import axiosClient from "../../config/axios";

type Post = {
    id: number;
    title: string;
    content: string;
    topic_id: number;
    creator_id: number;
    url_img: string;
    created_at: string;
    updated_at: string;
};

type UserPostProps = {
    post: Post;
};

const UserPost: FC<UserPostProps> = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [urlImg, setUrlImg] = useState(post.url_img);
    const jwt = localStorage.getItem('jwt');

    const handleSave = async () => {
        try {
            await axiosClient.put(`/posts/${post.id}`, {
                title,
                content,
                url_img: urlImg
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosClient.delete(`/posts/${post.id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            //codigo necesario para eliminar post desde perfil
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <li className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center w-5/6 m-auto list-none">
            {isEditing ? (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                        placeholder="Title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                        placeholder="Content"
                    />
                    <input
                        type="text"
                        value={urlImg}
                        onChange={(e) => setUrlImg(e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                        placeholder="Image URL"
                    />
                    <div className="flex justify-end">
                        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-4xl font-bold my-4">{post.title}</h2>
                    <h3 className="text-2xl my-2">{post.content}</h3>
                    {post.url_img && <img src={post.url_img} alt="Post Image" className="m-auto max-h-64 object-cover" />}
                    <h3 className="text-xl font-semibold my-2 text-left">{post.created_at}</h3>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default UserPost;
