import { FC, useState } from "react";
import axiosClient from "../../config/axios";
import useAuth from "../../hooks/useAuth";

type EditPostFormProps = {
    post: {
        id: number;
        title: string;
        content: string;
        url_img: string;
    };
    onSave: () => void;
    onCancel: () => void;
};

const EditPostForm: FC<EditPostFormProps> = ({ post, onSave, onCancel }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [urlImg, setUrlImg] = useState(post.url_img);
    const { jwt } = useAuth();

    const handleSave = async () => {
        try {
            await axiosClient.patch(`/posts/${post.id}`, {
                title,
                content,
                url_img: urlImg
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            onSave();
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    };

    return (
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
                <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
        </div>
    );
};

export default EditPostForm;
