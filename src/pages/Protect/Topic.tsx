// import { useParams } from "react-router-dom"
import { FC, useEffect, useState } from "react"
import axiosClient from "../../config/axios";
import { useParams } from "react-router-dom";
import Alert from "../../components/Static/Alert";
import Post from "../../components/Topic/Post";

type OnePost = {
    id: number;
    title: string;
    content: string;
    topic_id: number;
    creator_id: number;
    url_img: string;
    created_at: string;
    updated_at: string;
}

const Topic: FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [alert, setAlert] = useState({ type: '', msg: '' });

    const { id, name } = useParams();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await axiosClient.get(`posts/all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                setPosts(response.data.posts);
            } catch (error: any) {
                setAlert({ msg: error.response.data.message, type: 'alert' })
            }
        }
        fetchTopic();
    }, [jwt, id]);

    return (
        <>
            <div className="my-32 w-3/4 m-auto">
                <h2 className="text-6xl font-bold">Topic: {name}</h2>
                <h3 className="text-4xl font-bold my-8">Posts</h3>
                {
                    alert.msg && <Alert type={alert.type} msg={alert.msg} />
                }
                {
                    posts && posts.map((post: OnePost) => (
                        <Post key={post.id} post={post} />
                    ))
                }
            </div>
        </>
    )
}

export default Topic
