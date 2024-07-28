import { FC, useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { useParams } from "react-router-dom";
import Alert from "../../components/Static/Alert";
import Post from "../../components/Topic/Post";
import CreatePost from "../../components/Topic/CreatePost";

type OnePost = {
    id: number;
    title: string;
    content: string;
    topic_id: number;
    creator_id: number;
    url_img: string;
    created_at: string;
    updated_at: string;
};

const Topic: FC = () => {
    const [posts, setPosts] = useState<OnePost[]>([]);
    const [alert, setAlert] = useState({ type: '', msg: '' });
    const { id, name } = useParams();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await axiosClient.get(`posts/all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                setPosts(response.data.posts);
            } catch (error: any) {
                setAlert({ msg: error.response.data.message, type: 'alert' });
            }
        };
        fetchTopic();
    }, [jwt, id]);

    return (
        <>
            <div className="md:container md:mx-auto mt-16 p-2 bg-gray-100 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4 border-b border-gray-400 pb-2">{name}</h2>
            </div>

            <div className="md:container md:mx-auto flex flex-nowrap my-8 p-6 bg-cyan-500 shadow-md rounded-md w-1/3">
                <CreatePost topicId={id!} />
            </div>

            <div className="md:container md:mx-auto my-8 p-1 bg-gray-100 shadow-md rounded-md">
                {alert.msg && <Alert type={alert.type} msg={alert.msg} />}
                <div className="space-y-1">
                    {posts && posts.map((post: OnePost) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
}
export default Topic;
