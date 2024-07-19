import { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import Alert from "./Alert";
import { FC } from "react";

type Post = {
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
            } catch (error: any) {
                console.log(error);
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
                        {posts.map((post: Post) => (
                            <li key={post.id} className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center w-2/3 m-auto">
                                <h2 className="text-4xl font-bold my-4">{post.title}</h2>
                                <h3 className="text-2xl my-2 font-semibold">{post.content}</h3>
                                <img src={post.url_img} alt="Post Image" className="m-auto" />
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-4xl font-bold my-8 text-center">No posts</p>

            }
        </>
    );
}

export default Posts;

