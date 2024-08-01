import axiosClient from "../../config/axios";
import { FC, useEffect, useState } from "react";
import UserPost from "./UserPost";
import Alert from "../../components/Static/Alert";

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

const Posts: FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [alert, setAlert] = useState({ msg: '', type: '' });
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosClient.get('posts/me/posts', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setPosts(response.data.posts);
            } catch (error: any) {
                setAlert({ msg: error.response.data.message || 'An error occurred', type: 'error' });
            }
        };
        fetchPosts();
    }, [jwt]);

    const handlePostUpdate = async () => {
        try {
            const response = await axiosClient.get('posts/me/posts', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setPosts(response.data.posts);
        } catch (error: any) {
            setAlert({ msg: error.response.data.message || 'An error occurred', type: 'error' });
        }
    };

    return (
        <div className="w-full my-14 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
            {alert.msg && <Alert msg={alert.msg} type={alert.type} />}
            <div className="max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-sm">
                <ul>
                    {posts.map(post => (
                        <UserPost key={post.id} post={post} onPostUpdated={handlePostUpdate} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Posts;
