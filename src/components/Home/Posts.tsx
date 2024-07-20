import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Alert from "../Static/Alert";
import { FC } from "react";
import Post from "./Post";

type OnePost = {
    id: number;
    topic_id: number;
    creator_id: number;
    title: string;
    content: string;
    url_img: string;
    created_at: string;
    updated_at: string;
}

const Posts: FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [alert, setAlert] = useState({ type: '', msg: '' });
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axiosClient.get('/posts', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setPosts(response.data.posts);
                setAlert({ type: '', msg: '' });
            } catch (error: any) {
                setAlert({ type: 'error', msg: error.response.data.message });
            }
        };
        getPosts();
    }, [jwt]);

    return (
        <>
            {alert.msg && <Alert type={alert.type} msg={alert.msg} />}
            {
                posts.length > 0 ? (
                    <ul>
                        {posts.map((post: OnePost) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </ul>
                ) : <p className="text-4xl font-bold mt-8 text-center">No posts</p>

            }
        </>
    );
}

export default Posts;

