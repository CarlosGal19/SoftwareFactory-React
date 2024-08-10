import { FC, useState } from "react";
import axiosClient from "../../config/axios";
import Alert from "../../components/Static/Alert";
import { PostType } from "../../Types/Types";

type UserPostProps = {
    post: PostType;
    onPostUpdated: () => void; // Prop to notify parent component about updates
};

const UserPost: FC<UserPostProps> = ({ post, onPostUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [urlImg, setUrlImg] = useState(post.imageUrl);
    const [alert, setAlert] = useState({ msg: '', type: '' });
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
            setAlert({ msg: 'Post edited successfully!', type: 'success' });
            setIsEditing(false);
            onPostUpdated(); // Notify parent component
        } catch (error) {
            console.error("Failed to update post:", error);
            setAlert({ msg: 'Failed to update post.', type: 'error' });
        }
    };

    const handleDelete = async () => {
        try {
            await axiosClient.delete(`/posts/${post.id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setAlert({ msg: 'Post deleted successfully!', type: 'success' });
            onPostUpdated(); // Notify parent component
        } catch (error) {
            console.error("Failed to delete post:", error);
            setAlert({ msg: 'Failed to delete post.', type: 'error' });
        }
    };

    return (
        <li className="mt-6 p-6 bg-white shadow-xl rounded-lg text-center w-11/12 m-auto list-none border border-gray-200">
            {alert.msg && <Alert msg={alert.msg} type={alert.type} />}
            {isEditing ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Content"
                    />
                    <input
                        type="text"
                        value={urlImg}
                        onChange={(e) => setUrlImg(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Image URL"
                    />
                    <div className="flex justify-end space-x-4">
                        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Save</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200">Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-3xl font-bold my-4 text-gray-800">{post.title}</h2>
                    <h3 className="text-xl my-4 text-gray-600">{post.content}</h3>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post Image" className="m-auto max-h-64 object-cover rounded-md shadow-md" />}
                    <h3 className="text-lg font-medium my-4 text-gray-500 text-left">{new Date(post.created_at).toLocaleDateString()}</h3>
                    <div className="flex justify-end mt-4 space-x-4">
                        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200">Edit</button>
                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">Delete</button>
                    </div>
                </>
            )}
        </li>
    );

};

export default UserPost;
