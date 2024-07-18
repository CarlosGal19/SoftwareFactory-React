import { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import Alert from "./Alert";

const Posts = () => {
    const [posts, setPosts] = useState([]);
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
                        {posts.map((post: any) => (
                            <li key={post._id} className="my-4">
                                <h3 className="text-2xl font-bold">{post.title}</h3>
                                <p>{post.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-4xl font-bold my-8 text-center">No posts</p>

            }
        </>
    );
}

export default Posts;

