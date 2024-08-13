import axiosClient from "../../config/axios";
import { FC, useEffect, useState } from "react";
import UserPost from "./UserPost";
import Alert from "../../components/Static/Alert";
import { PostType } from "../../Types/Types";
import useAuth from "../../hooks/useAuth";

import { AlertType } from "../../Types/Types";

const Posts: FC = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [alert, setAlert] = useState<AlertType>({} as AlertType);
    const { jwt } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosClient.get('posts/me/posts', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setPosts(response.data.posts);
                setAlert({message: response.data.message, type: 'success'})
            } catch (error: any) {
                setAlert({ message: error.response.data.message || 'An error occurred', type: 'error' });
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
            setAlert({message: response.data.message, type: 'success'})
        } catch (error: any) {
            setAlert({ message: error.response.data.message || 'An error occurred', type: 'error' });
        }
    };

    return (
        <div className="w-full my-14 max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Posts</h2>
            {alert.message && <Alert alert={alert} />}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
                <ul className="space-y-4">
                    {
                        posts.length === 0 ? (
                            <p className="text-center text-lg text-gray-600">You don't have any posts yet</p>
                        ) : (
                            posts.map(post => (
                                <UserPost key={post.id} post={post} onPostUpdated={handlePostUpdate} />
                            ))
                        )
                    }
                </ul>
            </div>
        </div>
    );

};

export default Posts;
