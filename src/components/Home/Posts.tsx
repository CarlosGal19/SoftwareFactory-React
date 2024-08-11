import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Alert from "../Static/Alert";
import { FC } from "react";
import Post from "./Post";
import useAuth from "../../hooks/useAuth";

type OnePost = {
    id: number;
    topic_id: number;
    creator:{
        name: string;
        last_name: string;
    };
    title: string;
    content: string;
    url_img: string;
    created_at: string;
    updated_at: string;
};

const Posts: FC = () => {
    const [posts, setPosts] = useState<OnePost[]>([]);
    const [alert, setAlert] = useState({ type: "", msg: "" });
    const { jwt } = useAuth();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axiosClient.get("/posts", {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                console.log(response.data.posts);
                setPosts(response.data.posts);
                setAlert({ type: "", msg: "" });
            } catch (error: any) {
                setAlert({ type: "error", msg: error.response.data.message });
            }
        };
        getPosts();
    }, [jwt]);

    const handleEdit = (post: OnePost) => {
        setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? post : p)));
    };

    const handleDelete = async (id: number) => {
        try {
            await axiosClient.delete(`/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setPosts(posts.filter((post) => post.id !== id));
            setAlert({ type: "success", msg: "Post deleted successfully" });
        } catch (error: any) {
            setAlert({ type: "error", msg: error.response.data.message });
        }
    };

    return (
        <>
            {alert.msg && <Alert type={alert.type} msg={alert.msg} />}
            <div className="overflow-y-auto h-screen bg-gray-100 py-8">
                <div className="container mx-auto">
                    {posts.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            {posts.map((post: OnePost) => (
                                <Post
                                    key={post.id}
                                    post={post}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-4xl font-bold mt-8 text-center text-gray-700">No posts</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Posts;
